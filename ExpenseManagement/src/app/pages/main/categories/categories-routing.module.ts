import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateComponent } from './add-update/add-update.component';
import { CategoriesComponent } from './categories.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'income',
    title: 'Income',
    component: IncomeComponent
  },
  {
    path: 'expense',
    title: 'Expense',
    component: ExpenseComponent
  },
  {
    path: 'add',
    title: 'Add',
    component: AddUpdateComponent
  },
  {
    path: 'edit/:id',
    title: 'Edit',
    component: AddUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
