import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
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
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      return false;
    }
  }

  setToken(token: any) {
    localStorage.setItem('Token', token);
  }

  signUp(data: FormData) {
    return this.http.post<any>(environment.baseApi + 'register', data)
  }

  signIn(data: FormData) {
    return this.http.post<any>(environment.baseApi + 'login', data)
  }
}
