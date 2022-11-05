import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginForm: FormBuilder | any;

  constructor(private fb: FormBuilder,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let obj = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authservice.user.next(obj);
      this.authservice.setLoginDataLocal(obj);
    }
  }

}
