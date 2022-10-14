import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  counter:any;

  constructor(private appservice : AppService) { }

  ngOnInit(): void {
    this.appservice.counter.subscribe((res) => this.counter = res);
  }

}
