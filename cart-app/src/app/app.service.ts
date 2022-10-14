import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  counter = new BehaviorSubject<Number>(0);

  constructor() { }

  inc(data:any){
    data = data + 1;
    this.counter.next(data);
  }
}
