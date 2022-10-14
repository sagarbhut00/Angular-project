import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {

  counter:any;

  constructor(public appservice : AppService) { }

  ngOnInit(): void {
    this.appservice.counter.subscribe((data) => this.counter = data);
  }

}