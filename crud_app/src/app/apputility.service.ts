import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApputilityService {

  editMode = new BehaviorSubject(false);
  user = new BehaviorSubject(null);
  loggedIn = new BehaviorSubject('Login');

  constructor() { }

  loginCheck(form: any) {
    const data = this.getRegisterData();
    const userobj = data.find((obj: any) => obj.username === form.value.username);
    if (userobj !== undefined && (userobj.password === form.value.password)) {
      this.user.next(userobj);
      this.loggedIn.next('Logout');
      return true;
    } else {
      return false;
    }
  }
  autoLogin() {
    const data = this.getLoginData();
    if (!data) {
      this.loggedIn.next('Login');
      return;
    }
    this.loggedIn.next('Logout');
    this.user.next(data);
  }

  fetchsingaluser(userlist: any, userid: any) {
    const user = userlist.find((obj: any) => obj.id === Number(userid));
    return user;
  }

  getRegisterData() {
    let data = JSON.parse(localStorage.getItem('registerData') || '');
    return data;
  }
  setRegisterData(data: any) {
    localStorage.setItem('registerData', JSON.stringify(data));
  }

  getLoginData() {
    let data = localStorage.getItem('LoginData');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setLoginData(userobj: any) {
    localStorage.setItem('LoginData', JSON.stringify(userobj));
  }
}
