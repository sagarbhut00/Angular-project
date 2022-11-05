import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  input = '0';
  answer = false;
  do = true;
  opratorArr = ['+', '-', '*', '/', '%'];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  numberFunc(val: any) {
    let pos = this.getLastPosOpIndex();
    let subStr = this.input.substring(pos, this.input.length);

    if (subStr.length < 15 || !this.do) {
      if (this.answer && this.input !== '') {
        this.input = ''
        this.answer = false;
        this.do = true;
      }
      let lastChar = this.input.charAt(this.input.length - 1);
      if (val === '0') {
        if (this.opratorArr.includes(lastChar)) {
          this.input += val;
        }
        else if (this.input.charAt(pos + 1) !== '0') {
          this.input += val;
        }
        else if (this.input.charAt(pos + 2) === '.') {
          this.input += val;
        }
        if (this.input === '') {
          this.input += val;
        }
      } else {
        if (this.input.charAt(pos + 1) !== '0') {
          this.input += val;
        } else {
          if (this.input.charAt(pos + 2) === '.') {
            this.input += val;
          } else {
            this.input = this.input.replace(/.$/, val);
          }
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
    let index = this.getLastPosOpIndex();
    let lastChar = this.input.charAt(index);
    if (this.input !== '') {
      this.answer = false;
      if (this.input.length - index === 1) {
        return
      }
      else if (['+', '-'].includes(lastChar)) {
        let temp = lastChar === '+' ? '-' : '+';
        this.input = this.input.substring(0, index) + temp + this.input.substring(index + 1, this.input.length);
      } else {
        let temp = lastChar === '+' ? '-' : lastChar === '-' ? '+' : '-';
        this.input = this.input.substring(0, index + 1) + temp + this.input.substring(index + 1, this.input.length);
      }
    }
  }

  pointFunc() {
    let pos = this.getLastPosOpIndex();
    let subStr = this.input.substring(pos, this.input.length);
    if (subStr.length < 15) {
      if (this.answer && this.input !== '') {
        this.input = '';
        console.log(this.input);
        this.answer = false;
      }
      if (subStr.includes('.')) {
        return
      } else if (subStr.length < 2 && this.input.length > 2) {
        this.input = this.input.substring(0, pos) + subStr + '0.';
      }
      else {
        this.input = this.input.substring(0, pos) + subStr + '.';
      }
    }
  }
  equalFunction() {
    if (!this.answer) {
      let lastChar = this.input.charAt(this.input.length - 1);
      while (this.opratorArr.includes(lastChar)) {
        this.input = this.input.slice(0, -1);
        lastChar = this.input.charAt(this.input.length - 1);
      }
      this.input = eval(this.input).toString();
      if (this.input === 'Infinity' || this.input === '-Infinity') {
        this.input = 'Cannot divide by zero';
        this.do = false;
      }
      this.answer = true;
    }
    else if (!this.do) {
      this.input = '0';
    }
  }
  modulo() {
    let lastChar = this.input.charAt(this.input.length - 1);
    if (this.opratorArr.includes(lastChar)) {
      return
    } else {
      this.input = this.input + '/100';
      this.input = eval(this.input).toString();
      this.answer = true;
    }
  }

  clearAll() {
    this.input = '0';
    this.do = true;
    this.answer = false;
  }

  clear() {
    if (this.answer) {
      this.input = '0';
      this.do = true;
    } else {
      this.input = this.input.slice(0, -1);
      if (this.input.length === 0) {
        this.input = '0';
      }
    }
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
