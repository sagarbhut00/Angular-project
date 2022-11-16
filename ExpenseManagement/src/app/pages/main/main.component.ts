import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // navList: string[] = ['Dashboard','Transactions', 'Income', 'Expense',];

  navList = [
    {
      path: 'dashboard',
      name: 'Dashboard'
    },
    {
      path: 'category/income',
      name: 'Income'
    },
    {
      path: 'category/expense',
      name: 'Expense'
    },
    {
      path: 'category',
      name: 'Category'
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
