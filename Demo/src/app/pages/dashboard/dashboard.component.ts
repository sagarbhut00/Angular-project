import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice.service';
import { AddEditComponent } from '../add-edit/add-edit.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['image', 'name', 'type', 'description', 'amount', 'action'];
  dataSource!: MatTableDataSource<Data>;
  dataList!: Data[];
  noDataTemp = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private service: AppserviceService,
    private router: Router,
    private snackbar: MatSnackBar) {
    console.log("hello");
    if (localStorage.getItem('Product') === null || localStorage.getItem('Product') == undefined) {
      this.service.setData([]);
      return;
    }
  }

  ngOnInit(): void {
    this.dataList = this.service.getData();
    this.dataSource = new MatTableDataSource(this.dataList);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  //   let arr1 = this.dataList.map(obj => {
  //     let { image, ...others } = obj
  //   return others
  // })
  // this.dataSource = new MatTableDataSource(arr1);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.dataList = this.service.getData();
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  editData(obj: any) {
    const dialogRef = this.dialog.open(AddEditComponent, { data: obj });
    dialogRef.afterClosed().subscribe(res => {
      this.dataList = this.service.getData();
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteData(i: any) {
    if (confirm('Are you sure delete Product?')) {
      this.service.deleteData(i);
      this.snackbar.open('Delete Successfully!!', 'Ok', { duration: 2000 });
      this.dataList = this.service.getData();
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
