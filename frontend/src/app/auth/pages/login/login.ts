import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      farmName: ['', Validators.required],
      ownerName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      return;
    }

    this.loading = true;
    const { farmName, ownerName, password } = this.loginForm.value;

    try {
      await this.auth.login(farmName, ownerName, password);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.loading = false;
    }
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
