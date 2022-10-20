import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  registerForm: FormBuilder | any;
  submit: any;
  id: any;
  arr: any = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private route: Router) {
    if (localStorage.getItem('registerData') === null || localStorage.getItem('registerData') == undefined) {
      let userData: any = [];
      localStorage.setItem('registerData', JSON.stringify(userData));
      return;
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    })
  }

  onSubmit() {
    this.submit = true;
    console.log(this.registerForm.value.firstname);

    if (this.registerForm.valid === true) {

      let data = JSON.parse(localStorage.getItem('registerData') || '');

      if (Object.keys(data).length === 0) {
        this.id = 1;
      } else {
        this.id = Math.max(...data.map((user: any) => user.id)) + 1;
      }

      let obj = {
        id: this.id,
        firstname: this.registerForm.value.firstname.replace(/\s+/g, ' ').trim(),
        lastname: this.registerForm.value.lastname.replace(/\s+/g, ' ').trim(),
        username: this.registerForm.value.username.replace(/\s+/g, ' ').trim(),
        password: this.registerForm.value.password.replace(/\s+/g, ' ').trim(),
        userList: this.arr
      }
      data.push(obj);
      localStorage.setItem('registerData', JSON.stringify(data));
      this.toastr.success('Register successfully');
    }
    this.route.navigateByUrl('/login');
  }

}
