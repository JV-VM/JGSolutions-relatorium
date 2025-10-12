import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUp } from './auth/pages/sign-up/sign-up';
import { } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignUp,],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'frontend';
}
