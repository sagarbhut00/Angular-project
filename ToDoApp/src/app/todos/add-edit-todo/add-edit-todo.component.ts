import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit {

  addEditTodoForm: FormBuilder | any;
  id: any;
  submit = false;
  todoObj: any;
  editMode: any;

  constructor(private fb: FormBuilder, private todoservice: TodosService, private route: Router, private toastr: ToastrService) {
    if (localStorage.getItem('Todos') === null || localStorage.getItem('Todos') == undefined) {
      let todosList: any = [];
      this.todoservice.setTodos(todosList);
      return;
    }
    this.todoservice.todoObj.subscribe(res => this.todoObj = res);
    this.todoservice.editMode.subscribe(res => this.editMode = res);
  }

  ngOnInit(): void {
    this.addEditTodoForm = this.fb.group({
      title: [this.editMode ? this.todoObj.title : '', Validators.required],
      description: [this.editMode ? this.todoObj.description : '', Validators.required]
    })
  }

  onSubmit() {
    this.submit = true;

    if (this.addEditTodoForm.valid) {

      let data = this.todoservice.getTodos();

      if (!this.editMode) {

        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((todo: any) => todo.id)) + 1;
        }

        let obj = {
          id: this.id,
          title: this.addEditTodoForm.value.title,
          description: this.addEditTodoForm.value.description,
          date: Date(),
          status: false
        }

        data.push(obj);
        this.todoservice.setTodos(data);

        this.toastr.success('To-Do added successfully');
      } else {

        let obj = {
          id: this.todoObj.id,
          title: this.addEditTodoForm.value.title,
          description: this.addEditTodoForm.value.description,
          date: this.todoObj.date,
          status: this.todoObj.status
        }

        this.todoservice.editTodo(obj, data);
        this.toastr.success('To-Do Updated successfully');

      }
      this.route.navigate(['/todo/list']);
    }
  }
}
