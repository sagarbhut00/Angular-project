import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApputilityService {

  editMode = new BehaviorSubject(false);
  user = new BehaviorSubject('');


  // id = Math.max(...characters.map(user => user.id));

  id = new BehaviorSubject(1);

  constructor() { }

  fetchsingaluser(userid: any) {
    const data = JSON.parse(localStorage.getItem('userData') || '');
    console.log(data);
    const user = data.find((obj: any) => obj.id === Number(userid));
    return user;
  }

  loginCheck(form: any) {
    const data = JSON.parse(localStorage.getItem('registerData') || '');
    const userobj = data.find((obj: any) => obj.username === form.value.username);
    if (userobj !== undefined && (userobj.password === form.value.password)) {
      this.user.next(userobj);
      return true;
    } else {
      return false;
    }
  }
}
