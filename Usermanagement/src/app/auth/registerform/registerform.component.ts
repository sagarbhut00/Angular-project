import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  registerForm: FormBuilder | any;
  submit: any;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      this.registerForm.get('profile_image').setValue(file);
    }
  }
  
  onSubmit() {
    this.submit = true;
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.registerForm.value.first_name);
      formData.append('last_name', this.registerForm.value.last_name);
      formData.append('name', this.registerForm.value.name);
      formData.append('user_name', this.registerForm.value.user_name);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      formData.append('profile_image', this.registerForm.value.profile_image)
      this.authservice.setRegisterData(formData).subscribe(res => console.log(res));
      this.submit = false;
    }
  }

}
