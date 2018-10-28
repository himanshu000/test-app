import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  returnUrl: string;
  loginForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });

    // reset login status
    this.authService.logout();
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value);

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard']);
    }
  }
}
