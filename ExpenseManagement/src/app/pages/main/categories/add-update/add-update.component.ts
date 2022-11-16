import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {

  spendForm : FormBuilder | any;

  constructor(private fb : FormBuilder,
              private router: Router,
              public location: Location) { 
                this.spendForm = this.fb.group({
                  type: ['income', Validators.required],
                  category: ['', Validators.required],
                  note: [''],
                  amount: ['', Validators.required]
                })
              }

  // myControl = new FormControl('');
  expenseOptions: string[] = ['Food', 'Dinner', 'Fuel', 'Transport', 'General', 'Lunch'];
  incomeOptions: string[] = ['Salary', 'Deposit', 'Savings'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.select();
  }
  select(){
    this.filteredOptions = this.spendForm.get('category').valueChanges.pipe(
      startWith(''),
      map((value:any) => this.filter(value)),
    );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if(this.spendForm.value.type === 'income'){
      return this.incomeOptions.filter(option => option.toLowerCase().includes(filterValue));
    }else{
      return this.expenseOptions.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  onSave(){
    if(this.spendForm.valid){
      console.log(this.spendForm);
    }
  }
}
