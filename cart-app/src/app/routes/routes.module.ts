import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes.component';

const route: Routes = [
  {
    path: '',
    title: 'Routing',
    component: RoutesComponent
  },
  {
    path: 'more',
    title: 'Emps Details',
    component: DetailsComponent
  }
]
@NgModule({
  declarations: [DetailsComponent, RoutesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class RoutesModule {
  constructor() {
    console.log('Rounting Load')
  }
}
