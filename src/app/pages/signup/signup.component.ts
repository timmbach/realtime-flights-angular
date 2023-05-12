import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  error: string = '';

  signupForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup() {
    if (
      typeof this.signupForm.value.email === 'string' &&
      typeof this.signupForm.value.password === 'string'
    )
      this._authService
        .createUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(
          () => {
            localStorage.setItem('token', 'true');
            this.router.navigate(['/dashboard']);
          },
          (err) => {
            this.error = err.message;
            this.router.navigate(['/signup']);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }
}
