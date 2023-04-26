import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User, DatabaseObjects } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeletionConfirmComponent } from '../components/user-details/user-details.component';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  dialogRef: MatDialogRef<DeletionConfirmComponent>;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) { }

  openDeletionConfirm(username: string) {
    console.log(username);
    this.dialogRef = this.dialog.open(DeletionConfirmComponent, {
      data: {username: username},
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the user';

    this.dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.userService.deleteUser(username).subscribe(
          response => {
            this.userService.emitUserSubject();
            this.openSnackBar(`User ${username} was successful deleted`, 'Close');
            this.router.navigate(['users']);
          }
        );
      }
      this.dialogRef = {} as MatDialogRef<DeletionConfirmComponent>;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  failedConnection(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'User not found, check your username and password';
    } else if (error.status === 0) {
      return 'Check your connection and try again';
    } else {
      return 'Check your username and password or check your connection and try again';
    }
  }
}
