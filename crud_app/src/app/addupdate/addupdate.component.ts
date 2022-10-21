import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApputilityService } from '../apputility.service';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent implements OnInit {

  addEditUserForm: FormBuilder | any;
  submit: any;
  editMode: any;
  id: any;
  userdata: any;
  user: any;

  constructor(private route: Router, private appservice: ApputilityService, public toastr: ToastrService, private activated: ActivatedRoute, private fb: FormBuilder) {
    this.appservice.user.subscribe((res: any) => this.user = res);
    this.appservice.editMode.subscribe((res) => this.editMode = res);
  }
  ngOnInit(): void {

    if (/edit/.test(window.location.href)) {
      this.editMode = true;
      this.activated.paramMap.subscribe(param => {
        let check = this.appservice.fetchsingaluser(this.user.userList, param.get('id'));
        if (check === undefined) {
          alert('User Not Found');
          this.route.navigateByUrl('/users');
        } else {
          this.userdata = check;
        }

      })
    }

    this.addEditUserForm = this.fb.group({
      firstname: [this.editMode ? this.userdata.firstname : '', Validators.required],
      lastname: [this.editMode ? this.userdata.lastname : '', Validators.required],
      username: [this.editMode ? this.userdata.username : '', Validators.required],
      password: [this.editMode ? this.userdata.password : '', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    });

  }

  saveData() {
    this.submit = true;
    if (this.addEditUserForm.valid) {
      let data = this.appservice.getRegisterData();
      const userarr = this.user.userList;
      if (!this.editMode) {
        if (Object.keys(userarr).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...userarr.map((res: any) => res.id)) + 1;
        }
        let obj = {
          id: this.id,
          firstname: this.addEditUserForm.value.firstname.replace(/\s+/g, ' ').trim(),
          lastname: this.addEditUserForm.value.lastname.replace(/\s+/g, ' ').trim(),
          username: this.addEditUserForm.value.username.replace(/\s+/g, ' ').trim(),
          password: this.addEditUserForm.value.password.replace(/\s+/g, ' ').trim(),
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
        userarr[objIndex].firstname = this.addEditUserForm.value.firstname.replace(/\s+/g, ' ').trim();
        userarr[objIndex].lastname = this.addEditUserForm.value.lastname.replace(/\s+/g, ' ').trim();
        userarr[objIndex].username = this.addEditUserForm.value.username.replace(/\s+/g, ' ').trim();
        userarr[objIndex].password = this.addEditUserForm.value.password === '' ? this.userdata.password : this.addEditUserForm.value.password.replace(/\s+/g, ' ').trim();

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
