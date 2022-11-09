import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent
      },
      {
        path: 'product',
        title: 'Product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
