import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ConfigService } from '../../services/config.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;

  @Input() oldPassword: string;
  @Input() confirmPassword: string;
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder,
              private config: ConfigService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.userService.getUser(username).subscribe(
      (response: User) => {
        this.user = response;
        this.initForm(this.user);
      },
      error => {
        console.log('Cannot get this user');
      }
    );
  }

  initForm(user: User) {
    this.editUserForm = this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      username: [user.username, [Validators.minLength(3)]],
      password: ['', [Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.editUserForm.value;
    const user: User = {
      email: formValue['email'],
      password: formValue['password'] ? formValue['password'] : this.user.password
    };
    if (formValue['username']) user.username = formValue['username'];

    this.userService.editUser(this.user.id ?? -1, user).subscribe(
      (response: User) => {
        this.config.openSnackBar(`User ${response.username} is successful updated`, 'Close');
        this.router.navigate([`/users/${response.username}`]);
      },
      error => {
        console.log('An error occured, cannot edite user');
      }
    );
  }

}
