import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthLocalService } from './auth/services/auth-local';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = signal('Relatorium');
  constructor(private router: Router, private auth: AuthLocalService) {
    const user = this.auth.getLoggedUser();
    if (user) {
      this.router.navigate(['/dashboard/dashboard-page']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
