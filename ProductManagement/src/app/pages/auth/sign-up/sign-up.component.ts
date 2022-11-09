import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormBuilder | any;
  submit: any;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      name: ['', Validators.required],
      user_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      profile_image: ['', Validators.required]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.get('profile_image').setValue(file);
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.signupForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.signupForm.value.first_name);
      formData.append('last_name', this.signupForm.value.last_name);
      formData.append('name', this.signupForm.value.name);
      formData.append('user_name', this.signupForm.value.user_name);
      formData.append('email', this.signupForm.value.email);
      formData.append('password', this.signupForm.value.password);
      formData.append('profile_image', this.signupForm.value.profile_image)
      this.authservice.signUp(formData);
      this.submit = false;
    }
  }

}
