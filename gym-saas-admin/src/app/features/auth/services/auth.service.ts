import {
  Injectable,
  inject
} from '@angular/core';

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

  readonly user$: Observable<User | null> =
    authState(this.auth);

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

  get currentUser(): User | null {

    return this.auth.currentUser;

  }

  get isLoggedIn(): boolean {

    return !!this.auth.currentUser;

  }

}