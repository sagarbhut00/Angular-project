import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud_app';
  selected: string = '';

  navList = [
    {
      routelink: '/home',
      name: 'Home'
    },
    {
      routelink: '/users',
      name: 'Users'
    },
    {
      routelink: '/login',
      name: 'Login'
    },
  ]

  constructor(public route: Router) {
    // document.getElementById('Home')?.classList.add('active');
  }
}
