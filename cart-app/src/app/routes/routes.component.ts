import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataService } from './getdata.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  users: any;
  showSpinner = true;

  constructor(private getdata : GetdataService, private router:Router) { }

  ngOnInit() {
    this.getdata.func()
    .subscribe((res: any) => {
      this.users = res;
      this.showSpinner = false;
    })
  }

  gotoItems(id:any) {
    this.router.navigate(['route/more'], { queryParams : {id} });
  }
}
