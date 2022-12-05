import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  {
    path: 'form',
    title: 'Form',
    component: FormComponent
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
