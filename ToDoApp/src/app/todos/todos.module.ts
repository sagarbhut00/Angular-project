import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'add',
    component: AddEditTodoComponent
  },
  {
    path: 'edit',
    component: AddEditTodoComponent
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    AddEditTodoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
  ]
})
export class TodosModule { }
