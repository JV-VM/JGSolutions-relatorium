import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { NewEntryModal } from '../../components/new-entry-modal/new-entry-modal';
import { AuthLocalService } from '../../../auth/services/auth-local';
import { db, Transaction, Field } from '../../../shared/db/user-local';
import { Pdf } from '@app/shared/services/pdf';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    NewEntryModal,
  ],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardPage implements OnInit {
  private router = inject(Router);
  private pdf = inject(Pdf);
  private auth = inject(AuthLocalService);

  showModal = false;
  transactions = signal<Transaction[]>([]);
  fields = signal<Field[]>([]);
  avisos = ['Estoque de ureia baixo', 'pH crítico no talhão 3'];
  proximaAtividade = { data: '15/10', tipo: 'Pulverização' };

  receitaMes = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0)
  );

  despesaMes = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0)
  );

  saldo = computed(() => this.receitaMes() - this.despesaMes());
  totalLavouras = computed(() => this.fields().length);
  

  get farmName() {
    return this.auth.getLoggedUser()?.farmName ?? 'Sua Fazenda';
  }

  async ngOnInit() {
    await this.loadData();
    setInterval(() => this.loadData(), 15_000);
  }

  async loadData() {
    const user = this.auth.getLoggedUser();
    if (!user) return;

    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-`;

    const tx = await db.transactions.where('userId').equals(user.id!).toArray();
    const currentMonth = tx.filter((t) => (t.date ?? '').startsWith(prefix));
    this.transactions.set(currentMonth);

    const fs = await db.fields.where('userId').equals(user.id!).toArray();
    this.fields.set(fs);
  }

  goToFields() {
    this.router.navigate(['/lavouras']);
  }

  openNewEntry() {
    this.showModal = true;
  }

  async handleNewEntry(
    type: 'receita' | 'despesa' | 'atividade' | 'observacao' | 'relatorio'
  ) {
    this.showModal = false;

    if (type === 'receita' || type === 'despesa') {
      this.router.navigate(['/finanças', type]);
    } else if (type === 'relatorio') {
      const user = this.auth.getLoggedUser();
      if (!user) {
        alert('Usuário não autenticado.');
        return;
      }
      // 💾 Gera e baixa automaticamente
      await this.pdf.generateFinancialReport(user.id!);
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
