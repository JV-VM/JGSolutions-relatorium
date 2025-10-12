import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PhoneNumberComponent } from '../phone/phone';
@Component({
  selector: 'app-signup-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneNumberComponent],
  templateUrl: './signup-forms.html',
  styleUrls: ['./signup-forms.scss'],
})
export class SignupForms implements OnInit {
  sign_up!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.sign_up = this.fb.group({
      nome_fazenda: ['', Validators.required],
      nome_usuario: ['', Validators.required],
      phone: ['', Validators.required],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/
          ),
        ],
      ],
    });
  }
  onSubmit(): void {
    if (this.sign_up.invalid) {
      Object.keys(this.sign_up.controls).forEach((field) => {
        const control = this.sign_up.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
  }
  getErrorMessage(field: string): string {
    const control = this.sign_up.get(field);
    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field === 'senha') {
      if (control?.hasError('minLength')) {
        return 'A senha deve ter no mínimo 16 caracteres';
      }
      if (control?.hasError('pattern')) {
        return 'A senha deve ter maiúscula, minúscula, número e símbolo';
      }
    }
    return '';
  }
}
