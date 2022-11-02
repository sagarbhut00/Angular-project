import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoObj = new BehaviorSubject('');

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

  editTodo(todoObj: any, data: any) {
    let arr = data.map((obj: any) => {
      if (obj.id === todoObj.id) {
        return todoObj;
      }
      return obj;
    })
    this.setTodos(arr);
    this.todoObj.next('');
  }
  checkedTodo(id: any, status: any) {
    let data = this.getTodos();
    let arr = data.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, status: status ? false : true }
      }
      return obj;
    })
    this.setTodos(arr);
  }
}
