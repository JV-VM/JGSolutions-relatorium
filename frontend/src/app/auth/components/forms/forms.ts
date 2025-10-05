import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class FormsComponent implements OnInit {
  login?: FormGroup;
  ngOnInit() {
    this.login = new FormGroup({
      nome_da_fazenda: new FormControl('', Validators.required),
      nome_do_usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, ]),
    });
  }
  onSubmit() {
    if (this.login?.valid) {
    }
  }
}
