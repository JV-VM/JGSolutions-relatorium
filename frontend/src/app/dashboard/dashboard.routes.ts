import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { AuthGuard } from '../auth/guards/auth-guard';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard-page',
    component: DashboardPage,
    canActivate: [AuthGuard],
  },
];
