import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoList: any;

  constructor(private route: Router, private todoservice: TodosService, private toastr: ToastrService) { }

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
