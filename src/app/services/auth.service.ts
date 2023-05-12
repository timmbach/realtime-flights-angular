import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: AngularFireAuth, private router: Router) {}

  signIn(email: string, password: string) {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this._auth.signOut();
  }

  seeUser() {
    return this._auth.onAuthStateChanged((user) => {
      user;
    });
  }
}
