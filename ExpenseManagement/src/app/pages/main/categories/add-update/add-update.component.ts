import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { SpendService } from 'src/app/services/spend.service';


@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {

  spendForm: FormBuilder | any;

  constructor(private fb: FormBuilder,
    public location: Location,
    private spendservice: SpendService,
    private datepipe: DatePipe) {
    this.spendForm = this.fb.group({
      type: ['income', Validators.required],
      category: ['', Validators.required],
      note: [''],
      amount: ['', Validators.required],
      date: [new Date(), Validators.required]
    })
  }

  expenseOptions: string[] = ['Food', 'Dinner', 'Fuel', 'Transport', 'General', 'Lunch'];
  incomeOptions: string[] = ['Salary', 'Deposit', 'Savings'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.select();
  }
  select() {
    this.filteredOptions = this.spendForm.get('category').valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filter(value)),
    );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.spendForm.value.type === 'income') {
      return this.incomeOptions.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return this.expenseOptions.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  onSave() {
    if (this.spendForm.valid) {
      console.log(this.spendForm);
      let now = this.datepipe.transform(this.spendForm.value.date, 'dd-MM-yyyy');
      let obj = {
        date: now,
        type: this.spendForm.value.type,
        category: this.spendForm.value.category,
        amount: this.spendForm.value.amount,
        note: this.spendForm.value.note,
      }
      this.spendservice.add(obj);
    }
  }
}
