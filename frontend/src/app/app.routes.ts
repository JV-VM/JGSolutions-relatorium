import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'finanças',
    loadChildren: () =>
      import('./finances/finances-form.routes').then(
        (m) => m.FINANCES_FORM_ROUTES
      ),
  },
  {
    path: 'lavouras',
    loadChildren: () =>
      import('./fields/fields.routes').then((m) => m.FIELDS_ROUTES),
  },
];
