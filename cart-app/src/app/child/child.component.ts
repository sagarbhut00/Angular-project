import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  @Input('name') public name: any ;
  @Output() public vote = new EventEmitter<boolean>();
  didvote = false;
  msg = "child msg...."

  voted(yes:boolean){
    this.vote.emit(yes);
    this.didvote = true;
  }
  func(){
    alert("This is child Method.")
  }

  ngOnInit(): void {
  }

}
