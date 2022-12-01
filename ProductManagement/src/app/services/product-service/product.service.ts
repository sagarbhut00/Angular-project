import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  editProductObj = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }


  setProductList(list: any) {
    localStorage.setItem('Product', JSON.stringify(list));
  }

  getProductList() {
    return JSON.parse(localStorage.getItem('Product') || '');
  }

  add(data: FormData) {
    return this.http.post(environment.baseApi + 'products', data);
  }

  edit(data: object) {
    return this.http.post(environment.baseApi + 'products/update', data);
  }

  delete(index: any, data: any) {
    this.http.post(environment.baseApi + 'products/delete', data)
    let dataList = this.getProductList();
    dataList.splice(index, 1);
    this.setProductList(dataList);
  }
}
