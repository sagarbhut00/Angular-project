import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApputilityService } from 'src/app/apputility.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginForm: FormBuilder | any;
  submit: any;
  message = false;
  id: any;
  user: any;

  constructor(private fb: FormBuilder, private appservice: ApputilityService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submit = true;

    if (this.loginForm.valid) {
      let check = this.appservice.loginCheck(this.loginForm);
      if (check) {
        this.route.navigate(['/home']);
        this.toastr.success('Login successfully');
        this.appservice.user.subscribe((res) => this.user = res);
        this.appservice.setLoginData(this.user);
      }
      else {
        this.message = true;
      }
    }
  }

  onkeydown() {
    this.message = false;
  }
}
