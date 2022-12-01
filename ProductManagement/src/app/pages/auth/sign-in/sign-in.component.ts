import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormBuilder | any;
  submit: any;
  message: any;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.authservice.signinMessage.subscribe(res => this.message = res)
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submit = true;
    if (this.signinForm.valid) {

      let formData = new FormData()
      formData.append('email', this.signinForm.value.email);
      formData.append('password', this.signinForm.value.password);

      this.authservice.signIn(formData).subscribe(res => {
        this.authservice.setToken(res.data.token);
        this.toastr.success(res.msg);
        this.router.navigate(['dashboard']);
      },
        error => {
          this.authservice.signinMessage.next('Email or Password invalid');
        }
      )
      this.submit = false;
    }
  }

  onkeydown() {
    this.message = '';
  }
}
