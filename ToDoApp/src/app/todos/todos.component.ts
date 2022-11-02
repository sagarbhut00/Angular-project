import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoList: any;
  temp: any;
  editMode: any;
  activeCount = 0;
  completeCount = 0;

  constructor(private route: Router, private todoservice: TodosService, private toastr: ToastrService, private active: ActivatedRoute) {

    this.todoservice.editMode.subscribe(res => this.editMode = res);
    this.todoList = this.todoservice.getTodos();

  }

  ngOnInit(): void {

    // this.active.paramMap.subscribe(param => this.temp = param.get('key'));
    this.temp = /list/.test(window.location.href) ? 'list' : (/active/.test(window.location.href) ? 'active' : 'complete');
    this.todoservice.key.next(this.temp);

    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].status) {
        this.completeCount++;
      } else {
        this.activeCount++;
      }
    }
  }
  deleteTodo(id: any) {
    if (confirm('Are you sure delete todo?')) {
      this.activeCount--;
      this.completeCount--;
      this.todoservice.deleteTodo(id);
      this.toastr.success('To-do Deleted Successfully');
      this.todoList = this.todoservice.getTodos();
    }
  }

  editTodo(todo: any) {
    this.todoservice.editMode.next(true);
    this.todoservice.todoObj.next(todo);
    this.route.navigate([`todo/edit`, todo.id]);
  }

  checkedTodo(id: any, status: any) {
    this.activeCount--;
    this.completeCount--;
    this.todoservice.checkedTodo(id, status);
    this.todoList = this.todoservice.getTodos();
    if (!status) {
      this.toastr.success('To-do Completed');
    } else {
      this.toastr.success('To-do Active');
    }
  }

}
