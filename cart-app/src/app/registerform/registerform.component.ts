import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted = false;
  NotAllowemails = ['abc@gmail.com', 'xyz@gmail.com'];
  temp: any;


  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.pattern("^[a-z0-9+_.-]+@[a-z.-]+\\.[a-z]{2,4}$"), Validators.required, this.NaEmail.bind(this)]),
      birthDate: new FormControl(''),
      gender: new FormControl('Male'),
      phoneNo: new FormArray([
        new FormGroup({
          type: new FormControl(''),
          number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)])
        })
      ]),
      designation: new FormControl('Angular Devloper'),
      skills: new FormArray([
        new FormControl('')
      ])
    }, { validators: this.firstAndLastNotSame });
  }

  onSubmit() {
    console.log(this.registerForm)
    this.temp = true;
    if (this.registerForm.valid) {
      this.submitted = true;
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addSkill() {
    this.registerForm.get('skills').push(new FormControl(null, Validators.required))
  }

  addContact() {
    this.registerForm.get('phoneNo').push(new FormGroup({
      type: new FormControl(''),
      number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)])
    }))
  }

  NaEmail(control: FormControl) {
    if (this.NotAllowemails.indexOf(control.value) !== -1) {
      return { 'emailContain': true };
    }
    return null;
  }

  firstAndLastNotSame(control: AbstractControl) {
    const fnm = control.get('firstName');
    const lnm = control.get('lastName');
    return fnm && lnm && fnm.value === lnm.value ? { namesame: true } : null;
  }
}

