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

  constructor(private fb: FormBuilder, private todoservice: TodosService, private route: Router, private toastr: ToastrService) {
    if (localStorage.getItem('Todos') === null || localStorage.getItem('Todos') == undefined) {
      let todosList: any = [];
      this.todoservice.setTodos(todosList);
      return;
    }
  }

  ngOnInit(): void {
    this.addEditTodoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submit = true;

    if (this.addEditTodoForm.valid) {
      console.log(this.addEditTodoForm);

      let data = this.todoservice.getTodos();

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
      this.route.navigate(['/todos']);
      this.toastr.success('To-Do added successfully');
    }
  }
}
