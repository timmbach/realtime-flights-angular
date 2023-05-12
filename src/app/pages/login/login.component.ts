import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (
      typeof this.loginForm.value.email === 'string' &&
      typeof this.loginForm.value.password === 'string'
    )
      this._authService
        .signIn(this.loginForm.value.email, this.loginForm.value.password)
        .then(
          () => {
            localStorage.setItem('token', 'true');
            this.router.navigate(['/dashboard']);
          },
          (err) => {
            this.error = err.message;
            this.router.navigate(['/login']);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }
}
