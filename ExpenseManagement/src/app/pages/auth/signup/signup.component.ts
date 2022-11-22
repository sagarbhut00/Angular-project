import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormBuilder | any;
  submit: any;
  emailMsg: any;
  hide = true;
  errorMsg: string = '';

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) {
    // this.authservice.signupMessage.subscribe(res => this.emailMsg = res);
  }

  ngOnInit(): void {
    this.authservice.errorSignupMessage.subscribe(res => this.errorMsg = res);
    console.log(this.errorMsg);
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9+_.-]+@[a-z.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("[a-zA-z0-9].*")]],
    })
  }

  onSubmit() {
    this.submit = true;
    if (this.signupForm.valid) {
      let email = this.signupForm.value.email.trim();
      let password = this.signupForm.value.password.trim();
      this.authservice.signUp(email,password);
      this.submit = false;
    }
  }

  onkeydown() {
    this.emailMsg = '';
  }
}

