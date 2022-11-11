import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: any;
  product : any = '';

  constructor(private router: Router,
    private productservice: ProductService) {
    if (localStorage.getItem('Product') === null || localStorage.getItem('Product') == undefined) {
      this.productservice.setProductList([]);
      return;
    }
  }

  ngOnInit(): void {
    this.productList = this.productservice.getProductList();
  }

  viewProduct(obj: any) {
    this.product = obj;
  }

  addProduct() {
    this.router.navigate(['dashboard/product/add']);
  }

  editProduct(item:any){
    this.productservice.editProductObj.next(item);
    this.router.navigate(['dashboard/product/edit', item.id]);
  }

  deleteProduct(i:any,item:any){
    if(confirm('Are you Sure Delete this')){
    this.productservice.delete(i,item);
    this.productList = this.productservice.getProductList();
    }
    
  }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   template: `<div class="modal-content">
//               <div class="modal-header">
//                 <h1 class="modal-title fs-5" id="exampleModalLabel">{{product.name}}</h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div class="modal-body">
//                 <p>{{product.description}}</p>
//                 <p>{{product.price}}</p>
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               </div>
//             </div>`,
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
