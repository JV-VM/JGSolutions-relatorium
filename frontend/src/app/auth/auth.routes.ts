import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { SignUpPage } from './pages/sign-up/sign-up';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'sign-up', component: SignUpPage },
];
