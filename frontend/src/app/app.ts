import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Welcome to Relatorium';
}
