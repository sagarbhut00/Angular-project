import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

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
    this.http.post(environment.baseApi + 'products', data).subscribe((res: any) => {
      console.log(res);
      let dataList = this.getProductList();
      dataList.push(res.data);
      this.setProductList(dataList);
      this.toastr.success('Product Add Successfull!')
      this.router.navigate(['dashboard/product']);
    });
  }

  edit(data: FormData) {
    let dataList = this.getProductList();
    this.http.post(environment.baseApi + 'products/update', data).subscribe((res: any) => {
      console.log(res);
      let arr = dataList.map((obj: any) => {
        if (obj.id === Number(data.get('id'))) {
          return res.data;
        }
        return obj;
      });
      this.setProductList(arr);
      this.toastr.success('Product Updated Successfull!')
      this.router.navigate(['dashboard/product']);
    });
    this.editProductObj.next(null);
  }

  delete(index: any, data: any) {
    let dataList = this.getProductList();
    dataList.splice(index, 1);
    this.setProductList(dataList);
    this.http.post(environment.baseApi + 'products/delete', data);
    this.toastr.success('Product Deleted Successfully!');
  }
}
