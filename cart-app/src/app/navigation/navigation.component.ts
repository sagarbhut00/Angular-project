import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //title variable to bind
  title = 'Hello World!!!';
  profile = 'Show';

  //variable for check in *ngIF
  isvalid = false;

  constructor() { }

  //Event Binding
  
  toggle(){
    this.isvalid = !this.isvalid;
    if(this.isvalid)
    {
      this.profile = 'Hide';
    }else{this.profile = 'Show';}
  }

  

  ngOnInit(): void {
  }

}
