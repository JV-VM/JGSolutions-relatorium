import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLocalService } from '../../services/auth-local';
import { PhoneNumberComponent } from '../../components/phone/phone';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  imports: [PhoneNumberComponent, ReactiveFormsModule],
})
export class SignUpPage {
  sign_up: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthLocalService,
    private router: Router
  ) {
    this.sign_up = this.fb.group(
      {
        nome_fazenda: ['', [Validators.required, Validators.minLength(6)]],
        nome_usuario: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]],
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(24),
          ],
        ],
        confirmar_senha: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  // --- Valida se as senhas coincidem
  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmar_senha')?.value;
    return senha && confirmar && senha !== confirmar
      ? { mismatch: true }
      : null;
  }

  // --- Mensagens de erro personalizadas
  getErrorMessage(controlName: string): string {
    const control = this.sign_up.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Campo obrigatório.';
    if (control.hasError('minlength')) {
      const required = control.getError('minlength').requiredLength;
      return `Mínimo de ${required} caracteres.`;
    }
    if (control.hasError('mismatch')) return 'As senhas não coincidem.';
    return '';
  }
  onCountryFromPhone(iso2: string) {
    localStorage.setItem('preferredCountry', iso2.toUpperCase());
  }

  // --- Submissão do formulário
  async onSubmit() {
    if (this.sign_up.invalid) {
      this.sign_up.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.sign_up.value;

    try {
      await this.authService.signUp({
        farmName: formValue.nome_fazenda,
        ownerName: formValue.nome_usuario,
        phone: formValue.phone,
        password: formValue.senha,
      });

      this.successMessage = 'Fazenda cadastrada com sucesso!';
      setTimeout(() => this.router.navigate(['/auth/login']), 1500);
    } catch (err) {
      this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
  goToSignUp() {
    this.router.navigate(['/auth/login']);
  }
}
