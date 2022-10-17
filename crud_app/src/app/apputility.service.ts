import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApputilityService {

  editMode = new BehaviorSubject(false);
  id = new BehaviorSubject(1);

  constructor() { }
}
