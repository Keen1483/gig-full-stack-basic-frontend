import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() confirmPassword: string;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private config: ConfigService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.userForm.value;
    const user: User = {
      email: formValue['email'],
      password: formValue['password']
    };
    if (formValue['username']) user.username = formValue['username'];

    this.userService.createUser(user).subscribe(
      (response: User) => {
        this.config.openSnackBar(`User ${response.username} is successful created`, 'Close');
        this.router.navigate([`/users/${response.username}`]);
      },
      error => {
        console.log('Cannot create user, an error occured: ' + error);
      }
    );
  }

}
