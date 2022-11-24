import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { SpendService } from 'src/app/services/spend.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  displayedColumns: string[] = ['date', 'category', 'amount', 'note', 'action'];
  dataSource!: MatTableDataSource<Data>;
  dataList!: Data[];
  spinner:boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    public datepipe: DatePipe,
    private spendservice: SpendService) { }

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.router.navigate(['main/category/add']);
  }

  edit(data: Data) {
    this.spendservice.transData.next(data);
    this.router.navigate(['main/category/edit', data['id']]);
  }

  delete(data: Data) {
    if (confirm('Are You sure, Delete this Transaction?')) {
      this.spendservice.delete(data);
      this.getData();
    }
  }

  async getData() {
    let list: Data[];
    await this.spendservice.getDatafromDB().then(value => {
      list = value as Data[];
      this.dataList = list;
      this.spendservice.id.next(this.dataList[this.dataList.length - 1]['id']);
      this.dataList = this.dataList.filter(res => res['type'] === 'income');
      this.spinner = false;
      console.log(this.dataList);
    })
      .catch(err => {
        this.spinner = false;
      });
    this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData() {
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {

        case 'date': {
          let newDate = new Date(item.date);
          return newDate;
        }
        default: {
          return item[property];
        }
      }
    };
    this.dataSource.sort = this.sort;
  }
}
