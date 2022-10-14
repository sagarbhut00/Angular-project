import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditional-dir',
  templateUrl: './conditional-dir.component.html',
  styleUrls: ['./conditional-dir.component.css']
})
export class ConditionalDirComponent implements OnInit {

  isAge = true;
  font_style = 'normal';

  constructor() { }
  student = [
    {name : "sagar" , age : 21},
    {name : "hiten" , age : 21},
    {name : "mangu" , age : 15},
    {name : "smit" , age : 12},
    {name : "magan" , age : 23}
  ]

  isvalid = false;
  profile = 'Show';

  ngOnInit(): void {
  }

  fontset(s:any){
    this.font_style = s;
  }

  toggle(){
    this.isvalid = !this.isvalid;
    if(this.isvalid)
    {
      this.profile = 'Hide';
    }else{this.profile = 'Show';}
  }
}
