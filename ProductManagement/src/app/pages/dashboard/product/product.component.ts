import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: any;
  product: any = '';

  constructor(
    private router: Router,
    private productservice: ProductService,
    private toastr: ToastrService) {
    if (localStorage.getItem('Product') === null || localStorage.getItem('Product') == undefined) {
      this.productservice.setProductList([]);
      return;
    }
    this.productList = this.productservice.getProductList();
  }

  ngOnInit(): void { }

  viewProduct(obj: any) {
    this.product = obj;
  }

  addProduct() {
    this.router.navigate(['dashboard/product/add']);
  }

  editProduct(item: any) {
    this.productservice.editProductObj.next(item);
    this.router.navigate(['dashboard/product/edit', item.id]);
  }

  deleteProduct(i: any, item: any) {
    if (confirm('Are you Sure Delete this Product')) {
      this.productservice.delete(i, item);
      this.toastr.success('Product Deleted Successfully!');
      this.productList = this.productservice.getProductList();
    }

  }
}
