import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Data, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpendService {

  id = new BehaviorSubject<Number>(0);
  dataList !: Data[];
  transData = new BehaviorSubject<Data>({});


  constructor(private db: AngularFireDatabase,
    private router: Router,
    private location: Location) { }

  async add(data: any) {
    let id;
    this.id.subscribe(res => id = Number(res) + 1);
    data.id = id;
    await this.db.object(`userData/${id}`).set(data);
    this.location.back();
  }

  async delete(data: Data){
    await this.db.object(`userData/${data['id']}`).remove();
  }

  async edit(data: Data){
    await this.db.object(`userData/${data['id']}`).set(data);
    this.location.back();
  }

  getDatafromDB() {
    return this.db.list('userData').valueChanges()
  }

  getSingleData(id:number){
    return this.db.object('/userData/'+ id).valueChanges();
  }

  // async getData() {
  //   let list: Data[];
  //   await this.getDatafromDB().then(value => {
  //     list = value as Data[];
  //     this.dataList = list;
  //   });
  //   this.id.next(this.dataList.length);
  //   console.log(this.dataList);
  //   return this.dataList;
  //   // this.dataSource = new MatTableDataSource(this.dataList);
  // }

  // getDatafromDB() {
  //   return new Promise<Data>((resole, reject) => {
  //     this.db.list('userData').valueChanges().subscribe(value =>
  //       resole(value));
  //   });
  // }
}

