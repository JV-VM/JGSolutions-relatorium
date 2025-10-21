import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatFormFieldModule,
  MatLabel,
  MatHint,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { db, Field } from '../../../shared/db/user-local';
import { AuthLocalService } from '../../../auth/services/auth-local';

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './field-forms.html',
  styleUrls: ['./field-forms.scss'],
})
export class FieldForms implements OnInit {
  isEdit = false;
  fieldId: string | null = null;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthLocalService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cultura: ['', Validators.required],
      hectares: [null, [Validators.required, Validators.min(0.1)]],
      dataPlantio: ['', Validators.required],
      variedade: [''],
    });
  }

  async ngOnInit() {
    this.fieldId = this.route.snapshot.paramMap.get('id');
    if (this.fieldId) {
      this.isEdit = true;
      const field = await db.fields.get(this.fieldId);
      if (field) this.form.patchValue(field);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.auth.getLoggedUser();
    if (!user) {
      alert('Usuário não autenticado.');
      return;
    }

    const record: Field = {
      id: this.fieldId || crypto.randomUUID(),
      userId: user.id!,
      farmName: user.farmName,
      nome: this.form.value.nome!,
      cultura: this.form.value.cultura!,
      hectares: this.form.value.hectares!,
      dataPlantio: this.form.value.dataPlantio!,
      variedade: this.form.value.variedade || '',
      syncStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (this.isEdit) {
      await db.fields.update(this.fieldId!, record);
      this.snack.open('Lavoura atualizada!', 'OK', { duration: 2000 });
    } else {
      await db.fields.add(record);
      this.snack.open('Lavoura criada!', 'OK', { duration: 2000 });
    }

    this.router.navigate(['/lavouras']);
  }

  cancelar() {
    this.router.navigate(['/lavouras']);
  }
}
