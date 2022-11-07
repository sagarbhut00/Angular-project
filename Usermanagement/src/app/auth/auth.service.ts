import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../appModel/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null!);

  constructor(private http: HttpClient) { }

  getLoginToken(){
   return localStorage.getItem('Token');
  }
  setLoginToken(token: any) {
    localStorage.setItem('Token', JSON.stringify(token));
  }


  setRegisterData(obj:FormData) {
    return this.http.post<any>('http://192.168.0.166/laravel-sanctum-api/public/api/register', obj);
  }

  checkLoginData(obj:FormData){
    return this.http.post<any>('http://192.168.0.166/laravel-sanctum-api/public/api/login', obj);
  }
}
