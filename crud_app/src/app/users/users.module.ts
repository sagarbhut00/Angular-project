import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddupdateComponent } from './add-update-user/addupdate.component';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const route: Routes = [
  {
    path: '',
    title: 'Users',
    component: UsersComponent
  },
  {
    path: 'add',
    title: 'Add User',
    component: AddupdateComponent
  },
  {
    path: 'edit/:id',
    title: 'Edit User',
    component: AddupdateComponent
  }
]

@NgModule({
  declarations: [
    UsersComponent,
    AddupdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class UsersModule {
  constructor() { }
}
