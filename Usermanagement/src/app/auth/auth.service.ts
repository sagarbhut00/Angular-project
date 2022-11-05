import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../appModel/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor() { }

  setLoginDataLocal(obj: any) {
    localStorage.setItem('LoginData', JSON.stringify(obj));
  }


}
