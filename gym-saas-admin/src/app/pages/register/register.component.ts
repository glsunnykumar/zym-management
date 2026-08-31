import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth/auth.service';
import { GymService } from '../../service/GymService/gym-service.service';
import { CommonModule } from '@angular/common';

// Services

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ]
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private gymService: GymService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      gymName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password, gymName } = this.registerForm.value;

    try {
      const userCredential = await this.authService.signup(email, password);
      const userId = userCredential.user.uid;

      await this.gymService.createGym(userId, gymName);

      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  getErrorMessage(error: any): string {
    switch (error?.code) {
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return 'Something went wrong';
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}