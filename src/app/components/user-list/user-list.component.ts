import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  showSpinner: boolean = true;

  users: User[];
  userSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'email', 'username', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public config: ConfigService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.userSubscription$ = this.userService.userSubject$.subscribe(
      (response: User[]) => {
        this.users = response;
        this.showSpinner = false;

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('An error occured');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
      this.userSubscription$.unsubscribe();
  }

}
