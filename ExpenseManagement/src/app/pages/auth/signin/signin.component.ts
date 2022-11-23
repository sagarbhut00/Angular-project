import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormBuilder | any;
  submit: any;
  hidePassword = true;
  isSignin !: boolean;
  errorMsg:string = '';

  constructor(private fb: FormBuilder,
    public authservice: AuthService,
  ) { }

  ngOnInit(): void {
    this.authservice.isSignin.subscribe(res => this.isSignin = res);
    this.authservice.errorSigninMessage.subscribe(res => this.errorMsg = res)
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    this.submit = true;
    if (this.signinForm.valid) {
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      this.authservice.signIn(email, password);
      this.submit = false;
    }
  }

  onkeydown() {
    this.errorMsg = '';
  }
}
