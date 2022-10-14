import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from '../getdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user:any;

  constructor(private active : ActivatedRoute, private getdata : GetdataService) {}

  ngOnInit(): void {
    this.active.queryParams.subscribe(param =>{
     let pid = Number(param['id']);
     this.getdata.fechsingleemp(pid).subscribe(res => {
      this.user = res;
     })
    })


  }

}
