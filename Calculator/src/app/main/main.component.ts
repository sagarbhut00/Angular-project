import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  input = '';
  answer = false;
  opratorArr = ['+', '-', '*', '/', '%'];

  constructor() { }

  ngOnInit(): void {
  }

  func(val: any) {
    if (this.input.length < 15) {
      if (this.answer && this.input !== '') {
        this.input = ''
        this.answer = false;
      }
      let lastChar = this.input.charAt(this.input.length - 1);
      let pos = this.getLastPosOpIndex();
      if (val === '0') {
        if (this.opratorArr.includes(lastChar)) {
          this.input += val;
        }
        else if (this.input.charAt(pos + 1) !== '0') {
          this.input += val;
        }
        if (this.input === '') {
          this.input += val;
        }
      } else {
        if (this.input.charAt(pos + 1) !== '0') {
          this.input += val;
        } else {
          this.input = this.input.replace(/.$/, val);
        }
      }
    }
  }
  opratorFunc(val: any) {

    if (this.input !== '') {
      this.answer = false;
      let lastChar = this.input.charAt(this.input.length - 1);
      if (!this.opratorArr.includes(lastChar)) {
        this.input += val;
      }
      else if (this.opratorArr.includes(val) && lastChar !== val) {
        this.input = this.input.replace(/.$/, val);
      }
    }
  }

  plusMinus() {
    let lastChar = this.input.charAt(this.input.length - 1);
    console.log(lastChar);
    let temp = lastChar === '+' ? '-' : '+';
    this.input = this.input.replace(lastChar, temp);
  }

  equalFunction() {
    if (!this.answer) {
      let lastChar = this.input.charAt(this.input.length - 1);
      if (this.opratorArr.includes(lastChar)) {
        this.input = this.input.slice(0, -1);
      }
      this.input = eval(this.input).toString();
      this.answer = true;
    }
  }

  clearAll() {
    this.input = '';
    this.answer = false;
  }

  clear() {
    this.input = this.input.slice(0, -1);
  }

  getLastPosOpIndex() {
    let pos: number;
    pos = this.input.lastIndexOf('+');
    if (this.input.lastIndexOf('-') > pos) pos = this.input.lastIndexOf('-');
    if (this.input.lastIndexOf('*') > pos) pos = this.input.lastIndexOf('*');
    if (this.input.lastIndexOf('/') > pos) pos = this.input.lastIndexOf('/');
    if (this.input.lastIndexOf('%') > pos) pos = this.input.lastIndexOf('%');
    return pos;
  }
}
