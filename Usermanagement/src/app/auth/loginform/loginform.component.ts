import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginForm: FormBuilder | any;
  submit: any;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) {
    this.authservice.user.subscribe(res => console.log(res))
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {

    this.submit = true;
    if (this.loginForm.valid) {
      this.router.navigate(['/home']);
      let obj = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      let formData = new FormData()
      formData.append('email',this.loginForm.value.email)
      formData.append('password',this.loginForm.value.password)
      this.authservice.user.next(obj);
      this.authservice.checkLoginData(formData).subscribe(res => this.authservice.setLoginToken(res.data.token));
      ;
      this.submit = false;
      this.router.navigate(['/home']);
    }
  }

}
