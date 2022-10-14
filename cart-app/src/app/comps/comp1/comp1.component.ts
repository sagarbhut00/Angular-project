import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit{

  counter:any;

  constructor(public appservice : AppService) { }

  ngOnInit(): void {
    this.appservice.counter.subscribe((data) => this.counter = data);
  }

}
