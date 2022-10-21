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
  user: any;
  userList: any = [];

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
      let data = this.appservice.getRegisterData();
      let userarr = this.user.userList;
      userarr.splice(id, 1);
      this.appservice.user.next(this.user);

      const newarray = data.map((obj: any) => {
        if (obj.id === this.user.id) {
          return { ...obj, userList: userarr }
        }
        return obj;
      })

      this.appservice.setRegisterData(newarray);
      this.appservice.setLoginData(this.user);
      this.route.navigateByUrl('/users');
      this.toster.success('User Deleted Successfully');
      this.fetchData();
    }
  }

  fetchData() {
    this.appservice.user.subscribe((res: any) => this.user = res);
    this.userList = this.user.userList;
  }

}
