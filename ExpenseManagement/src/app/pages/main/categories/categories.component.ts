import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { SpendService } from 'src/app/services/spend.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['date', 'type', 'category', 'amount', 'note'];
  dataSource!: MatTableDataSource<Data>;
  dataList:any;

  constructor(private router: Router,
    public datepipe: DatePipe,
    private spendservice: SpendService) { }


  ngOnInit(): void {
    
    this.spendservice.getDatafromDB().subscribe((res) => {
      this.dataList = res;
      this.spendservice.id.next(this.dataList.length);
      this.dataSource = new MatTableDataSource(this.dataList);
    });
  }

  add() {
    this.router.navigate(['main/category/add']);
  }

//   async getData() {
//     let list: Data[];
//     await this.spendservice.getDatafromDB().then(value => {
//       list = value as Data[];
//       this.dataList = list;
//     });
//     this.spendservice.id.next(this.dataList.length);
//     this.dataSource = new MatTableDataSource(this.dataList);
//   }
}
