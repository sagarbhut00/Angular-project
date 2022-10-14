import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-ex',
  templateUrl: './pipe-ex.component.html',
  styleUrls: ['./pipe-ex.component.css']
})
export class PipeExComponent implements OnInit {

  
  constructor() { }
  
  title = "This is use of Pipe.";
  birthDay:any = new Date();

  ngOnInit(): void {
  }

}
