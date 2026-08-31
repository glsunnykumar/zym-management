import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
    IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    IonicModule,
],
})
export class LoginPage implements OnInit {
 
  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {   }
  

    async login() {

    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    try {

      const { email, password } = this.form.value;

      await this.authService.login(
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

  

