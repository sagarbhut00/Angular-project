import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormBuilder | any;
  submit: any;
  message:any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private route: ActivatedRoute) {
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

      this.authservice.signIn(formData);
      this.submit = false;
    }
  }

  onkeydown() {
    this.message = '';
  }
}
