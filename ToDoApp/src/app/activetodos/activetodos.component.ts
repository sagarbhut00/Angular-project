import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-activetodos',
  templateUrl: './activetodos.component.html',
  styleUrls: ['./activetodos.component.css']
})
export class ActivetodosComponent implements OnInit {

  todoList: any;

  constructor(private todoservice: TodosService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.todoList = this.todoservice.getTodos();
  }

  deleteTodo(id: any) {
    this.todoservice.deleteTodo(id);
    this.toastr.success('To-do Deleted Successfully');
    this.todoList = this.todoservice.getTodos();
  }

  checkedTodo(id: any, status: any) {
    let data = this.todoservice.getTodos();
    let arr = data.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, status: status ? false : true }
      }
      return obj;
    })
    this.todoservice.setTodos(arr);
    this.todoList = this.todoservice.getTodos();
    console.log(status);
    if (!status) {
      this.toastr.success('To-do Completed')
    }
  }
}
