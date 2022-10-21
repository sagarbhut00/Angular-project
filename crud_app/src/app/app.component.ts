import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApputilityService } from './apputility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud_app';
  selected: string = '';
  loggedIn = new Boolean();

  navList = [
    {
      routelink: '/home',
      name: 'Home'
    },
    {
      routelink: '/users',
      name: 'Users'
    },
  ]

  constructor(public route: Router, private appservice: ApputilityService) { }

  ngOnInit(): void {
    this.appservice.loggedIn.subscribe((res) => { this.loggedIn = res; console.log(res); })
    console.log(this.loggedIn);
    this.appservice.autoLogin();
  }

  onLogout() {
    this.appservice.loggedIn.next(false);
    return ['/login'];
  }
}
