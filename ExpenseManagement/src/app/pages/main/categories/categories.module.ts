import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CategoriesRoutingModule } from './categories-routing.module';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoriesComponent } from './categories.component';
import { MatModule } from 'src/app/appModules/mat.module';
import { AddUpdateComponent } from './add-update/add-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'



@NgModule({
  declarations: [
    CategoriesComponent,
    IncomeComponent,
    ExpenseComponent,
    AddUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,

  ],
  providers: [DatePipe]
})
export class CategoriesModule { }
