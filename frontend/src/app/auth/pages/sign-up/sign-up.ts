import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class SignUpPage {
  sign_up: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sign_up = this.fb.group(
      {
        nome_fazenda: ['', [Validators.required]],
        nome_usuario: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(4)]],
        confirmar_senha: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const senha = control.get('senha')?.value;
    const confirmar = control.get('confirmar_senha')?.value;
    return senha === confirmar ? null : { mismatch: true };
  }

  getErrorMessage(field: string): string {
    const control = this.sign_up.get(field);
    if (control?.hasError('required')) return 'Campo obrigatório.';
    if (control?.hasError('minlength')) return 'Mínimo de 4 caracteres.';
    return 'Campo inválido.';
  }

  onSubmit() {
    if (this.sign_up.valid) {
      console.log('Formulário válido:', this.sign_up.value);
      // Aqui entra o AuthService -> signup()
    } else {
      this.sign_up.markAllAsTouched();
    }
  }
}
