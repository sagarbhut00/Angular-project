import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private appservice: ApputilityService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    })
  }

  onSubmit() {
    this.submit = true;

    if (this.loginForm.valid) {
      let user = this.appservice.loginCheck(this.loginForm);
      if (user) {
        this.route.navigate(['/home']);
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
