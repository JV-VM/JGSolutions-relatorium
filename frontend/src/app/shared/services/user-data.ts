import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('preferredCountry');
    localStorage.removeItem('financeCountry');
    localStorage.removeItem('userProfile');

    // Clear session storage if used
    sessionStorage.clear();

    console.log('User logged out — local data cleared.');
  }
}
