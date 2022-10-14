import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectName: any;

  constructor(public route:Router){}

  months = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", 
            "November", "December"];

  navList = [
    {
      routeLink : '/home',
      name : 'Home'
    },
    {
      routeLink : '/about',
      name : 'About'
    },
    {
      routeLink : '/advertice',
      name : 'Ad'
    },
    {
      routeLink : '/parent',
      name : 'Parent'
    },
    {
      routeLink : '/custom',
      name : 'CustomElement'
    },
    {
      routeLink : '/style-bind',
      name : 'Binding'
    },
    {
      routeLink : '/pipe-ex',
      name : 'Pipe'
    },
    {
      routeLink : '/svg-ex',
      name : 'Svg'
    },
    {
      routeLink : '/cond-dir',
      name : 'Directive'
    },
    {
      routeLink : '/route',
      name : 'Routes'
    },
    {
      routeLink : '/posts',
      name : 'Posts'
    },
    {
      routeLink : '/subject',
      name : 'Subject'
    },
    {
      routeLink : '/localstorage',
      name : 'LocalData'
    },
  ]

  redirect(path:any,name:any){
    this.route.navigateByUrl(path);
    this.selectName = name;
  }

  isActive(name:any){
    return this.selectName === name; 
  }

  selectmonth(){
    alert("Are you sure for Month change..");
  }

  
}
