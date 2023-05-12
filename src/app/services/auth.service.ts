import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: AngularFireAuth, private router: Router) {}

  signIn(email: string, password: string) {
    // this._auth.signInWithEmailAndPassword(email, password).then(
    //   () => {
    //     localStorage.setItem('token', 'true');
    //     this.router.navigate(['/dashboard']);
    //   },
    //   (err) => {
    //     alert(err.message);
    //     this.router.navigate(['/login']);
    //   }
    // );
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: string, password: string) {
    // this._auth.createUserWithEmailAndPassword(email, password).then(
    //   () => {
    //     alert('Signup Successful');
    //     this.router.navigate(['/login']);
    //   },
    //   (err) => {
    //     alert(err.message);
    //     localStorage.setItem('error', err.message);
    //     this.router.navigate(['/signup']);
    //   }
    // );

    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this._auth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  seeUser() {
    return this._auth.onAuthStateChanged((user) => {
      user;
    });
  }
}
