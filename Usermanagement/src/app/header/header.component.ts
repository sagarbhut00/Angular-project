import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public authservice : AuthService) {
    console.log(this.authservice.getLoginToken());
    if(this.authservice.getLoginToken()){
      console.log('6');
    }else{
      console.log('nathi');
    }
   }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.removeItem('Token');
  }

}
