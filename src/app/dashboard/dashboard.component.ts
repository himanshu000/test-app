import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { TestService } from '../services/test.service';
import { IUser } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: IUser[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website', 'star'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.testService.getUsersData().subscribe((result: IUser[]) => {
      this.users = result;
      this.dataSource = new MatTableDataSource<IUser>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewUser(id) {
    this.router.navigate(['/user/view', id]);
  }

  editUser(id) {
    this.router.navigate(['/user/edit', id]);
  }

  deleteUser(id) {
    const index = this.users.findIndex(element => (element.id === id));
    if (index > -1) {
      this.users.splice(index, 1);
      this.dataSource = new MatTableDataSource<IUser>(this.users);
      this.dataSource.paginator = this.paginator;
    }
  }
}
