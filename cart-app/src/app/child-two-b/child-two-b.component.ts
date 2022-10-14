import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-two-b',
  templateUrl: './child-two-b.component.html',
  styleUrls: ['./child-two-b.component.css']
})
export class ChildTwoBComponent implements OnInit {

  @Input() size : any;
  @Output() sizeChange = new EventEmitter(); 

  constructor() { }
  func(){
    this.size = +this.size + 1;
    this.sizeChange.emit(this.size);
  }

  ngOnInit(): void {
  }

}
