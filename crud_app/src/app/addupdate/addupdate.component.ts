import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApputilityService } from '../apputility.service';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent implements OnInit {

  editMode: any;
  id: any;

  constructor(private route: Router, private appservice: ApputilityService) { }

  ngOnInit(): void {
    this.appservice.editMode.subscribe((res) => this.editMode = res);
    this.appservice.id.subscribe((res) => this.id = res);
    if (this.editMode) { }
  }

  saveData(form: NgForm) {

    this.appservice.id.next(this.id + 1);

    let data = JSON.parse(localStorage.getItem('userData') || '');
    console.log(data)
    data.push(form);
    localStorage.setItem('userData', JSON.stringify(data));


    console.log(data);

    this.route.navigateByUrl('/users');
  }

}
