import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signinMessage = new BehaviorSubject('');

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return localStorage.getItem('Token');
  }

  setToken(token: any) {
    localStorage.setItem('Token', token);
  }

  signUp(data: FormData) {
    this.router.navigate(['']);
    return this.http.post<any>(environment.baseApi + 'register', data)
  }

  signIn(data: FormData) {
    this.http.post<any>(environment.baseApi + 'login', data).subscribe(res => {
      this.setToken(res.data.token);
      this.router.navigate(['dashboard']);
    },
    error => {
        return this.signinMessage.next('Email or Password invalid');
      });
  }
}
