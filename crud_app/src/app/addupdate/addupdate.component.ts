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

  constructor(private route: Router, private appservice: ApputilityService, public toastr: ToastrService, private activated: ActivatedRoute) { }
  ngOnInit(): void {
    this.appservice.editMode.subscribe((res) => this.editMode = res);
    if (/edit/.test(window.location.href)) {
      this.editMode = true;
      this.activated.paramMap.subscribe(param => {
        this.userdata = this.appservice.fetchsingaluser(param.get('id'));
      })
    }
  }

  saveData(form: NgForm) {
    if (form.valid === true) {
      let data = JSON.parse(localStorage.getItem('userData') || '');
      if (!this.editMode) {
        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((user: any) => user.id)) + 1;
        }

        let obj = {
          id: this.id,
          firstname: form.value.firstname.replace(/\s+/g, ' ').trim(),
          lastname: form.value.lastname.replace(/\s+/g, ' ').trim(),
          username: form.value.username.replace(/\s+/g, ' ').trim(),
          password: form.value.password.replace(/\s+/g, ' ').trim()
        }
        data.push(obj);
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('User added successfully', 'Success!');

      }
      else {
        const objIndex = data.findIndex((obj: any) => obj.id === this.userdata.id);
        data[objIndex].firstname = form.value.firstname.replace(/\s+/g, ' ').trim();
        data[objIndex].lastname = form.value.lastname.replace(/\s+/g, ' ').trim();
        data[objIndex].username = form.value.username.replace(/\s+/g, ' ').trim();
        data[objIndex].password = form.value.password === '' ? this.userdata.password : form.value.password.replace(/\s+/g, ' ').trim();
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('User Data Updated successfully', 'Updated!');
      }
      this.route.navigateByUrl('/users');
    }
  }
}
