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

  edit(data: Object) {
    return this.http.post(environment.baseApi + 'products/update', data)
      .subscribe((res: any) => {
        console.log(res);
        let dataList = this.getProductList();
        let arr = dataList.map((obj: any) => {
          console.log(obj);
          if (obj.id === Number(res.data.id)) {
            return res.data;
          }
          return obj;
        });
        this.setProductList(arr);
        this.toastr.success('Product Updated Successfull!');
        this.router.navigate(['dashboard/product']);
        this.editProductObj.next(null);
      });
  }

  delete(index: any, data: any) {
    this.http.post(environment.baseApi + 'products/delete', data)
    let dataList = this.getProductList();
    dataList.splice(index, 1);
    this.setProductList(dataList);
  }
}
