import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApputilityService } from '../apputility.service';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent implements OnInit {

  editMode: any;
  id: any;
  userdata: any;
  user: any;

  constructor(private route: Router, private appservice: ApputilityService, public toastr: ToastrService, private activated: ActivatedRoute) {
    this.appservice.user.subscribe((res: any) => this.user = res);
  }
  ngOnInit(): void {
    this.appservice.editMode.subscribe((res) => this.editMode = res);
    if (/edit/.test(window.location.href)) {
      this.editMode = true;
      this.activated.paramMap.subscribe(param => {
        this.userdata = this.appservice.fetchsingaluser(this.user.userList, param.get('id'));
      })
    }
  }

  saveData(form: any) {
    if (form.valid) {
      let data = this.appservice.getRegisterData();
      const userarr = this.user.userList;
      if (!this.editMode) {
        console.log('add');
        console.log(userarr);
        if (Object.keys(userarr).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...userarr.map((res: any) => res.id)) + 1;
        }
        let obj = {
          id: this.id,
          firstname: form.value.firstname.replace(/\s+/g, ' ').trim(),
          lastname: form.value.lastname.replace(/\s+/g, ' ').trim(),
          username: form.value.username.replace(/\s+/g, ' ').trim(),
          password: form.value.password.replace(/\s+/g, ' ').trim()
        }
        userarr.push(obj);
        this.appservice.user.next(this.user);

        const newarray = data.map((obj: any) => {
          if (obj.id === this.user.id) {
            return { ...obj, userList: userarr }
          }
          return obj;
        })

        this.appservice.setRegisterData(newarray);
        this.appservice.setLoginData(this.user);
        this.toastr.success('User Add successfully', 'Added!!');
        this.route.navigateByUrl('/users');
      }
      else {
        const objIndex = userarr.findIndex((obj: any) => obj.id === this.userdata.id);
        userarr[objIndex].firstname = form.value.firstname.replace(/\s+/g, ' ').trim();
        userarr[objIndex].lastname = form.value.lastname.replace(/\s+/g, ' ').trim();
        userarr[objIndex].username = form.value.username.replace(/\s+/g, ' ').trim();
        userarr[objIndex].password = form.value.password === '' ? this.userdata.password : form.value.password.replace(/\s+/g, ' ').trim();

        this.appservice.user.next(this.user);

        const newarray = data.map((obj: any) => {
          if (obj.id === this.user.id) {
            return { ...obj, userList: userarr }
          }
          return obj;
        })
        this.appservice.setRegisterData(newarray);
        this.appservice.setLoginData(this.user);
        this.toastr.success('User Update successfully', 'Updated!!');
        this.route.navigateByUrl('/users');
      }
    }
  }
}
