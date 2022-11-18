import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
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

  displayedColumns: string[] = ['date', 'type', 'category', 'amount', 'note', 'action'];
  dataSource!: MatTableDataSource<Data>;
  dataList!: Data[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    public datepipe: DatePipe,
    private spendservice: SpendService) { }

  ngOnInit(): void {
    this.spendservice.getDatafromDB().subscribe((res : any) => {
      this.dataList = res;
      console.log(this.dataList);
      if(this.dataList.length !== 0){
        this.spendservice.id.next(this.dataList[this.dataList.length -1 ].id);
      }
      this.dataSource = new MatTableDataSource(this.dataList.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  edit(data:Data) {
    this.spendservice.transData.next(data);
    this.router.navigate(['main/category/edit', data.id]);
  }

  delete(data:Data) {
    if (confirm('Are You sure, Delete this Transaction?')){
      this.spendservice.delete(data);
    }
  }
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

