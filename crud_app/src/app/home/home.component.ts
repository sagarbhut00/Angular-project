import { Component, OnInit } from '@angular/core';
import { ApputilityService } from '../apputility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private appservice: ApputilityService) { }

  ngOnInit(): void {
    this.appservice.user.subscribe((res) => this.user = res)
  }

}
