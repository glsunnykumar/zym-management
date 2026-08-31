import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'gf-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule
  ],

  templateUrl: './login.component.html',

  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  private readonly snackBar =
    inject(MatSnackBar);

  readonly loading =
    signal(false);

  readonly hidePassword =
    signal(true);

  readonly form =
    this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        Validators.required
      ]

    });

  async login(): Promise<void> {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;

    }

    const {
      email,
      password
    } = this.form.getRawValue();

    this.loading.set(true);

    try {

      await this.authService.login(
        email!,
        password!
      );

      this.snackBar.open(
        'Login Successful',
        'Close',
        {
          duration: 3000
        }
      );

      await this.router.navigate([
        '/dashboard'
      ]);

    } catch (error) {

      console.error(error);

      this.snackBar.open(
        'Invalid email or password',
        'Close',
        {
          duration: 4000
        }
      );

    } finally {

      this.loading.set(false);

    }

  }

}