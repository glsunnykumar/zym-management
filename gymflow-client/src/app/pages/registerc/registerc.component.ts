import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonText
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth';


@Component({
  selector: 'app-registerc',
  templateUrl: './registerc.component.html',
  styleUrls: ['./registerc.component.scss'],
  standalone: true,
   imports: [
    CommonModule,
    ReactiveFormsModule,

    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonText
  ]
 
})
export class RegistercComponent  {

   loading = false;
  error = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

   async register() {

    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    try {

      const { email, password } = this.form.value;

      await this.authService.register(
        email!,
        password!
      );

      this.router.navigate(['/home']);

    } catch (err: any) {

      this.error = err.message;

    } finally {
      this.loading = false;
    }
  }

}
