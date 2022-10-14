import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-binding',
  templateUrl: './style-binding.component.html',
  styleUrls: ['./style-binding.component.css']
})
export class StyleBindingComponent implements OnInit {

  isFoo = true;
  style1 = "border:2px dotted red; backgroundcolor:pink;padding:10px";
  classes = "class1 class2";
  color = "blue";
  message ="This Text interpolation Example.";
  title = "tea";
  title1 = ''; 

  constructor() { }

  func()
  {
    alert("Hello World");
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  
  ngOnInit(): void {
  }

}
