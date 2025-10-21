import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryCurrencyMap } from '../../../shared/services/country-currency-map';
import { db, Transaction } from '../../../shared/db/user-local';
import { AuthLocalService } from '../../../auth/services/auth-local';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-finance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './finances-form.html',
  styleUrls: ['./finances-form.scss'],
})
export class FinancesForm implements OnInit {
  @Input() tipo: 'receita' | 'despesa' = 'despesa';
  form: FormGroup;

  categoriasReceita = ['Venda de Safra', 'Outros'];
  categoriasDespesa = [
    'Plantio',
    'Colheita',
    'Insumos',
    'Mão de Obra',
    'Transporte',
    'Outros',
  ];
  formasPagamento = ['Dinheiro', 'Pix', 'Cartão', 'Fiado'];

  locale = 'pt-BR';
  currency = 'BRL';
  datePlaceholder = 'dd/mm/aaaa';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private countryMap: CountryCurrencyMap,
    private auth: AuthLocalService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      data: ['', Validators.required],
      tipo: [this.tipo, Validators.required],
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      pagamento: ['', Validators.required],
      area: [''],
    });
  }

  ngOnInit() {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    this.form.get('data')?.setValue(iso, { emitEvent: false });

    const paramTipo = this.route.snapshot.paramMap.get('tipo') as
      | 'receita'
      | 'despesa'
      | null;
    if (paramTipo) {
      this.tipo = paramTipo;
      this.form.get('tipo')?.setValue(this.tipo);
    }
  }

  onValorInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/[^\d.,-]/g, '').replace(',', '.');
    const numericValue = parseFloat(raw) || 0;
    this.form.get('valor')?.setValue(numericValue, { emitEvent: false });
  }

  onValorBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = this.form.get('valor')?.value;
    if (!valor || !this.currency) return;
    input.value = new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Preencha todos os campos obrigatórios.', 'OK', {
        duration: 2500,
      });
      return;
    }

    const user = this.auth.getLoggedUser();
    if (!user) {
      this.snack.open('Usuário não autenticado.', 'OK', { duration: 2000 });
      return;
    }

    const now = new Date().toISOString();
    const record: Transaction = {
      id: crypto.randomUUID(),
      userId: user.id!,
      farmName: user.farmName,
      type: this.tipo === 'receita' ? 'income' : 'expense',
      category: this.form.value.categoria!,
      description: this.form.value.descricao!,
      value: this.form.value.valor!,
      date: this.form.value.data!,
      paymentMethod: this.form.value.pagamento!,
      fieldId: this.form.value.area || undefined,
      syncStatus: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    await db.transactions.add(record);
    this.snack.open('Registro salvo com sucesso!', 'Fechar', {
      duration: 2000,
    });
    this.router.navigate(['/dashboard/dashboard-page']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/dashboard-page']);
  }
}
