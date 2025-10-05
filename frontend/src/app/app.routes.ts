import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { Signup } from './auth/pages/signup/signup';
import { Board } from './home/pages/board/board';
import { Onboarding } from './onboarding/pages/onboarding/onboarding';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'sign-up', component: Signup },
  { path: 'home', component: Board },
  { path: 'on-boarding', component: Onboarding },
];
