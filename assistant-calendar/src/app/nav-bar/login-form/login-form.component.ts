import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
              '../../form-styles.css']
})

export class LoginFormComponent {
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  redirect: any;
  redirectPath: string = "";

  login = async (user: Object) => {
    this.http.post("http://localhost:3000/user/login", user).subscribe(res => {
    // create local storage item containing user information  
    localStorage.setItem("currUser", JSON.stringify(res));

      // if login was redirected to, navigate to intended page after login
      if (this.redirect == "true") {
        this.router.navigate([this.redirectPath]);
      }

      this.dialogRef.close();
    }, err => {
      console.log("error");
    });
  };

  /**
   * Clear local storage and check for route params
   */
  ngOnInit() {
    localStorage.clear();

    this.route.queryParams.subscribe(params => {
      this.redirect = params['redirect'];
      this.redirectPath = params['path'];
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public http: HttpClient
  ) {}

  /**
   * Retrieves data from form
   * @returns Object representing form values
   */
  getFormValues(): Object {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    }
  }

  /**
   * Attempts login http request
   */
  submit(): void {
    this.login(this.getFormValues());
  }

  /**
   * Closes Login dialog and opens Sign Up Dialog
   */
  openSignUpForm(): void {
    this.dialogRef.close('openSignUp');
  }

    /**
   * Closes Login dialog and opens Forgot Password Dialog
   */
  openForgotPasswordForm(): void {
    this.dialogRef.close('openForgotPass');
  }
}
