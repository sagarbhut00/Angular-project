import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Transaction {
  Date: string | null;
  Type: string;
  Category: string;
  Amount: number;
  Note: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Type', 'Category', 'Amount', 'Note'];
  dataSource: Transaction[] = [];

  constructor(private router: Router,
    public datepipe: DatePipe) { }


  ngOnInit(): void {
    let date = new Date();
    let now = this.datepipe.transform(date, 'dd-MM-yyyy');
    const TRANS_DATA: Transaction[] = [
      { Date: now, Type: 'Income', Category: 'salary', Amount: 10000, Note: '' },
      { Date: now, Type: 'Income', Category: 'salary', Amount: 10000, Note: '' },
      { Date: now, Type: 'Expense', Category: 'dinner', Amount: 70, Note: 'pangat' },
      { Date: now, Type: 'Income', Category: 'salary', Amount: 10000, Note: '' },
      { Date: now, Type: 'Income', Category: 'salary', Amount: 10000, Note: '' },
      { Date: now, Type: 'Income', Category: 'salary', Amount: 10000, Note: '' }
    ]
    this.dataSource = TRANS_DATA;
  }

  add() {
    this.router.navigate(['main/category/add']);
  }

}
