import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { SpendService } from 'src/app/services/spend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataList!: Data[];
  spinner = true;
  totalIncome!: number;
  totalExpense!: number;
  balance!: number;

constructor(public router: Router,
  private spendservice: SpendService) { }

ngOnInit(): void {
  this.getData();
}

onNavigate(path: string){
  this.router.navigate([`main/${path}`]);
}

  async getData() {
  let list: Data[];
  await this.spendservice.getDatafromDB().then(value => {
    list = value as Data[];
    this.dataList = list;
    this.totalIncome = this.dataList.filter(res => res['type'] === 'income').reduce((pre, next) => pre + next['amount'], 0);
    this.totalExpense = this.dataList.filter(res => res['type'] === 'expense').reduce((pre, next) => pre + next['amount'], 0);
    this.balance = this.totalIncome - this.totalExpense;
    this.spinner = false;
  })
    .catch(err => {
    });
}
}