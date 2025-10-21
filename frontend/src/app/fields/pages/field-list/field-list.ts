import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { db, Field } from '../../../shared/db/user-local';
import { AuthLocalService } from '../../../auth/services/auth-local';

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './field-list.html',
  styleUrls: ['./field-list.scss'],
})
export class FieldList implements OnInit {
  fields = signal<Field[]>([]);

  constructor(
    private router: Router,
    private auth: AuthLocalService,
    private snack: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.loadFields();
  }

  async loadFields() {
    const user = this.auth.getLoggedUser();
    if (!user) return;

    const all = await db.fields.where('userId').equals(user.id!).toArray();
    this.fields.set(all);
  }

  addNew() {
    this.router.navigate(['/lavouras/new']);
  }

  editField(id: string) {
    this.router.navigate(['/lavouras/edit', id]);
  }

  async deleteField(id: string) {
    const ok = confirm('Deseja excluir esta lavoura?');
    if (!ok) return;

    await db.fields.delete(id);
    await this.loadFields();
    this.snack.open('Lavoura excluída com sucesso', 'OK', { duration: 2000 });
  }

  goBack() {
    this.router.navigate(['/dashboard/dashboard-page']);
  }
}
