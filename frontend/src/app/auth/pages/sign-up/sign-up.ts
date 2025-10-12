import { Component } from '@angular/core';
import { SignupForms } from '../../components/signup-forms/signup-forms';
import { App } from '../../../app';

@Component({
  selector: 'app-sign-up',
  imports: [SignupForms],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
