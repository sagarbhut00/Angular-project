import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoApp';


  constructor(private route: Router, private todoservice: TodosService) {
    if (localStorage.getItem('Todos') === null || localStorage.getItem('Todos') == undefined) {
      let todosList: any = [];
      this.todoservice.setTodos(todosList);
      return;
    }
  }


}
