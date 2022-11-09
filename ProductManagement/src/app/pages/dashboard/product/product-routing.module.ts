import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'add',
    title: 'Add Product',
    component: AddEditProductComponent
  },
  {
    path: 'edit',
    title: 'Edit Product',
    component: AddEditProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
