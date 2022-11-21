import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, startWith, map, async } from 'rxjs';
import { SpendService } from 'src/app/services/spend.service';


@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {

  spendForm: FormBuilder | any;
  id !: number;
  data !: Data;
  categoryOptions: string[] = [];

  constructor(private fb: FormBuilder,
    public location: Location,
    private spendservice: SpendService,
    private datepipe: DatePipe,
    private activeroute: ActivatedRoute,
    private db: AngularFireDatabase) {
    this.activeroute.paramMap.subscribe((res: any) => this.id = res.get('id'));
    this.spendservice.transData.subscribe(res => {
      this.data = res;
    });

  }

  ngOnInit() {

    let todayDate = new Date();
    this.spendForm = this.fb.group({
      type: [this.id ? this.data['type'] : 'income', Validators.required],
      category: [this.id ? this.data['category'] : '', Validators.required],
      note: [this.id ? this.data['note'] : ''],
      amount: [this.id ? this.data['amount'] : '', Validators.required],
      date: [this.id ? new Date(this.data['date']) : todayDate, Validators.required]
    });
    this.selectCategory();
  }

  selectCategory() {
    if (this.spendForm.value.type === 'income') {
      this.categoryOptions = ['Salary', 'Deposit', 'Savings'];
    } else {
      this.categoryOptions = ['Food', 'Dinner', 'Fuel', 'Transport', 'General', 'Lunch'];
    }
  }

  onSave() {
    if (this.spendForm.valid) {
      if (!this.id) {
        let obj = {
          date: this.spendForm.value.date.toString(),
          type: this.spendForm.value.type,
          category: this.spendForm.value.category,
          amount: this.spendForm.value.amount,
          note: this.spendForm.value.note,
        }
        this.spendservice.add(obj);
      }
      else {
        let obj = {
          id: this.id,
          date: this.spendForm.value.date.toString(),
          type: this.spendForm.value.type,
          category: this.spendForm.value.category,
          amount: this.spendForm.value.amount,
          note: this.spendForm.value.note,
        }
        this.spendservice.edit(obj);
      }
    }
  }
}
