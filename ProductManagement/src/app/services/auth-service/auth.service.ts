import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signinMessage = new BehaviorSubject('');
  signupMessage = new BehaviorSubject('');

  constructor(private http: HttpClient, 
              private router: Router,
              private toastr: ToastrService) { }

  getToken() {
    return localStorage.getItem('Token');
  }

  setToken(token: any) {
    localStorage.setItem('Token', token);
  }

  signUp(data: FormData) {
    return this.http.post<any>(environment.baseApi + 'register', data).subscribe(res => {
      console.log(res);
      this.toastr.success(res.msg);
      this.router.navigate(['']);
    },
    error => {
      this.signupMessage.next('Email has already taken.');
    });
  }

  signIn(data: FormData) {
    this.http.post<any>(environment.baseApi + 'login', data).subscribe(res => {
      this.setToken(res.data.token);
      this.toastr.success(res.msg);
      this.router.navigate(['dashboard']);
    },
    error => {
        return this.signinMessage.next('Email or Password invalid');
      });
  }
}
