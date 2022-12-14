import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: 'list',
    component: TodosComponent
  },
  {
    path: 'active',
    title: 'Active Todos',
    component: TodosComponent
  },
  {
    path: 'complete',
    title: 'Completed Todos',
    component: TodosComponent
  },
  {
    path: 'add',
    title: 'Add Todo',
    component: AddEditTodoComponent
  },
  {
    path: 'edit/:id',
    title: 'Edit Todo',
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
export class TodosModule {
  constructor() { }
}
