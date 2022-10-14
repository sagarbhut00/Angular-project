import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // @ViewChild('myform') temp:NgForm | undefined;
  username:any = '';
  email1:any = '';
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onsubmit(myform:any){
    console.log(myform)
    if(myform.valid){

      this.username = myform?.value.username;
      this.email1 = myform?.value.email;
      this.submitted = true;
    }
  }

}
