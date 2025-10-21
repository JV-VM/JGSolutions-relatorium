import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLocalService } from '../services/auth-local';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthLocalService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
