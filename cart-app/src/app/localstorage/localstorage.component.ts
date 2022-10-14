import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.component.html',
  styleUrls: ['./localstorage.component.css']
})
export class LocalstorageComponent implements OnInit {

  data:any = {}
  searchdata:any = {};
  temp:any = {};
  constructor() { }

  ngOnInit(): void {
  }

  save(myform:NgForm){
    this.data.name = myform?.value.name;
    this.data.email = myform?.value.email;

    localStorage.setItem(this.data.name,JSON.stringify(this.data))
  }

  search(name:any){
    this.temp = localStorage.getItem(name);
    this.searchdata = JSON.parse(this.temp);
    console.log(this.searchdata);
  }

}
