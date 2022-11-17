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
  fileHolder: File | undefined;
  submit: any;
  emailMsg:any;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) { 
      this.authservice.signupMessage.subscribe(res => this.emailMsg = res);
    }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required,Validators.pattern("^[a-zA-z].*")]],
      last_name: ['', [Validators.required,Validators.pattern("^[a-zA-z].*")]],
      name: ['', [Validators.required,Validators.pattern("^[a-zA-z].*")]],
      user_name: ['', [Validators.required,Validators.pattern("^[a-zA-z0-9].*")]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9+_.-]+@[a-z.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,Validators.pattern("^[a-zA-z0-9].*")]],
      profile_image: ['']
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.signupForm.valid && this.fileHolder?.name) {
      const formData = new FormData();
      formData.append('first_name', this.signupForm.value.first_name);
      formData.append('last_name', this.signupForm.value.last_name);
      formData.append('name', this.signupForm.value.name);
      formData.append('user_name', this.signupForm.value.user_name);
      formData.append('email', this.signupForm.value.email);
      formData.append('password', this.signupForm.value.password);
      formData.append('profile_image', this.fileHolder, this.fileHolder.name)
      this.authservice.signUp(formData);
      this.submit = false;
    }
  }

  onkeydown() {
    this.emailMsg = '';
  }

}
