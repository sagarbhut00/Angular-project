import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivetodosComponent } from './activetodos/activetodos.component';
import { CompletedComponent } from './completed/completed.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'todos',
    title: 'Todos List',
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)
  },
  {
    path: 'active',
    title: 'Active Todos',
    component: ActivetodosComponent,
  },
  {
    path: 'complete',
    title: 'Completed Todos',
    component: CompletedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
