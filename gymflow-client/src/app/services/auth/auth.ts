import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService  {

   private auth = inject(Auth);

   user$ = authState(this.auth);  ;

  // Register
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

    // Logout
  logout() {
    return signOut(this.auth);
  }

  // Current User
  get currentUser() {
    return this.auth.currentUser;
  }
  
}
