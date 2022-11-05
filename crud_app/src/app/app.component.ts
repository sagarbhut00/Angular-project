import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApputilityService } from './apputility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud_app';
  selected: string = '';
  loggedIn: any;

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

  constructor(public route: Router, private appservice: ApputilityService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.appservice.loggedIn.subscribe((res) => this.loggedIn = res)
    this.appservice.autoLogin();

    // if (this.loggedIn === 'Login' && !(/login/.test(window.location.href))) {
    //   this.route.navigate(['/login']);
    // }
    // if (this.loggedIn === 'Logout' && (/login/.test(window.location.href))) {
    //   this.route.navigate(['/home']);
    // }
  }

  redirect() {
    if (this.loggedIn === 'Login') {
      this.route.navigate(['/login']);
    } else {
      localStorage.removeItem('LoginData');
      this.appservice.user.next(null);
      this.appservice.loggedIn.next('Login');
      this.route.navigate(['/login']);
      this.toastr.success('Logout successfully');
    }
  }
}
