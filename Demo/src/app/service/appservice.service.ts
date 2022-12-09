import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  setData(data:any){
    localStorage.setItem('Product', JSON.stringify(data));
   
  }

  getData(){
    return JSON.parse(localStorage.getItem('Product') || '');
  }

  deleteData(i: any) {
    let data = this.getData();
    data.splice(i, 1);
    this.setData(data);
  }
}
