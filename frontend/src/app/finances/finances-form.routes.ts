import { Routes } from '@angular/router';
import { FinancesForm } from './pages/finances-form/finances-form';

export const FINANCES_FORM_ROUTES: Routes = [
  {
    path: ':tipo',
    loadComponent: () =>
      import('./pages/finances-form/finances-form').then((m) => m.FinancesForm),
  },
];
