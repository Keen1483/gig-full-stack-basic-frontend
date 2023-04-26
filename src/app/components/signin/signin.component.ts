import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private config: ConfigService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.signinForm.value;
    const username = formValue['username'];
    const password = formValue['password'];

    this.authService.authenticate(username, password).subscribe(
      response => {
        this.config.openSnackBar(`User ${username} is logged successful`, 'Close');
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = this.config.failedConnection(error);
      }
    );
  }

}
