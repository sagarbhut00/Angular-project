import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {

  counter:any;

  constructor(public appservice : AppService) { }

  ngOnInit(): void {
    this.appservice.counter.subscribe((data) => this.counter = data);
  }

}
