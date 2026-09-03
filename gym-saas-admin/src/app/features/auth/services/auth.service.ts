import {
  Injectable,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth =
    inject(Auth);

   readonly currentUser = toSignal(
    authState(this.auth),
    {
      initialValue: null
    }
  );

  

  async login(
    email: string,
    password: string
  ): Promise<void> {

    await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

  }

  async logout(): Promise<void> {

    await signOut(
      this.auth
    );

  }

  get isLoggedIn(): boolean {

    return !!this.auth.currentUser;

  }

}