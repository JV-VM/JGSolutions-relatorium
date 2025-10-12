import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpPage } from './auth/pages/sign-up/sign-up';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignUpPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'frontend';
}
