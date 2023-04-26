import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ConfigService } from '../../services/config.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(public config: ConfigService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.userService.getUser(username).subscribe(
      (response: User) => {
        this.user = response;
      },
      error => {
        console.log('Cannot get this user');
      }
    );
  }

}

@Component({
  selector: 'app-deletion-confirm',
  templateUrl: './deletion-confirm.component.html',
  styleUrls: ['./deletion-confirm.component.scss']
})
export class DeletionConfirmComponent {
  
  constructor(public dialogRef: MatDialogRef<DeletionConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { username: string }) {}

  public confirmMessage: string;
}
