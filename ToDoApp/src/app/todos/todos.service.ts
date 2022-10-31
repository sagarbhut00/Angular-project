import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  setTodos(list: any) {
    localStorage.setItem('Todos', JSON.stringify(list));
  }

  getTodos() {
    return JSON.parse(localStorage.getItem('Todos') || '');
  }

  deleteTodo(i: any) {
    let data = this.getTodos();
    data.splice(i, 1);
    this.setTodos(data);
  }
}
