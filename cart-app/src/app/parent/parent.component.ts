import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {

  names = ['Sagar', 'Hiten', 'Smit'];

  agree = 0;
  disagree = 0;
  msg:any;

  @ViewChild(ChildComponent) child:any;
  
  constructor() { }

  voted(yes : boolean){
    if(yes) {
      this.agree++;
    }else{
      this.disagree++;
    }
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.msg = this.child.msg;
    }, 0);

  }
  
  // func(){
  //   this.child.func();
  //   // this.msg = this.child.msg;
  // }

}
