import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-ex',
  templateUrl: './svg-ex.component.svg',
  styleUrls: ['./svg-ex.component.css']
})
export class SvgExComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}
  
