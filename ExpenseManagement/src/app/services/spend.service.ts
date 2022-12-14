import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SpendService {

  id = new BehaviorSubject<Number>(0);
  dataList !: Data[];
  transData = new BehaviorSubject<Data>({});


  constructor(private db: AngularFireDatabase,
    private location: Location,
    private toastr: ToastrService
  ) { }

  async add(data: any) {
    let id;
    this.id.subscribe(res => id = Number(res) + 1);
    data.id = id;
    await this.db.object(`userData/${id}`).set(data);
    this.toastr.success('Transaction add Successfully');
    this.location.back();
  }

  async delete(data: Data) {
    await this.db.object(`userData/${data['id']}`).remove();
    this.toastr.success('Transaction delete Successfully');
  }

  async edit(data: Data) {
    await this.db.object(`userData/${data['id']}`).set(data);
    this.toastr.success('Transaction Update Successfully');
    this.location.back();
  }

  getSingleData(id: number) {
    return this.db.object('/userData/' + id).valueChanges();
  }

  getDatafromDB() {
    return new Promise<Data>((resole, reject) => {
      this.db.list('userData').valueChanges().subscribe(value => {
        if (value === undefined) {
          reject('Data is Empty');
        } else {
          resole(value)
        }
      }
      );
    })
  }

}

