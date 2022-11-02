import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  answer = '';

  constructor() { }

  ngOnInit(): void {
  }

  func(val: any) {
    this.answer += val;
  }

  ansFunction() {
    this.answer = eval(this.answer);
  }

  clearAll() {
    this.answer = '';
  }

  clear() {
    this.answer = this.answer.slice(0, -1);
  }



}
