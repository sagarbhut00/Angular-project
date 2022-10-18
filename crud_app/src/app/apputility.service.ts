import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApputilityService {

  editMode = new BehaviorSubject(false);


  // id = Math.max(...characters.map(user => user.id));

  id = new BehaviorSubject(1);

  constructor() { }

  fetchsingaluser(userid: any) {
    const data = JSON.parse(localStorage.getItem('userData') || '');
    console.log(data);
    const user = data.find((obj: any) => obj.id === Number(userid));
    return user;
  }
}
