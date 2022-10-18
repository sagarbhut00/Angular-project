import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApputilityService } from '../apputility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  editMode: any;
  data: any = [];

  constructor(private route: Router, private appservice: ApputilityService, private toster: ToastrService) {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  addUser() {
    this.appservice.editMode.next(false);
    this.route.navigateByUrl('users/add');
  }

  editUser(item: any) {
    this.appservice.editMode.next(true);
    this.route.navigate(['users/edit', item.id]);
  }

  deleteUser(id: any) {
    if (confirm('Are you sure delete user?')) {
      let data = JSON.parse(localStorage.getItem('userData') || '');
      console.log(data.splice(id, 1));
      localStorage.setItem('userData', JSON.stringify(data));
      this.toster.success('User Deleted Successfully', 'Deleted!!')
      this.fetchData();
    }
  }

  fetchData() {
    if (localStorage.getItem('userData') === null || localStorage.getItem('userData') == undefined) {
      let userData: any = [];
      localStorage.setItem('userData', JSON.stringify(userData));
      return;
    }
    else {
      this.data = JSON.parse(localStorage.getItem('userData') || '');
    }
  }

}
