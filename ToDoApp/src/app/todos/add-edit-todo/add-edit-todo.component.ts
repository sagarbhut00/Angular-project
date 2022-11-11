import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from '../todos.service';
import { Location } from '@angular/common';

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
  todoId: any;

  constructor(
    private fb: FormBuilder,
    private todoservice: TodosService,
    private router: Router,
    private toastr: ToastrService,
    public location: Location,
    private activeroute: ActivatedRoute
  ) {
    this.todoservice.todoObj.subscribe(res => this.todoObj = res);

    this.activeroute.paramMap.subscribe(param => this.todoId = param.get('id'));
  }

  ngOnInit(): void {
    this.addEditTodoForm = this.fb.group({
      title: [this.todoId !== null ? this.todoObj.title : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      description: [this.todoId !== null ? this.todoObj.description : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]]
    })
  }

  onSubmit() {
    this.submit = true;

    if (this.addEditTodoForm.valid) {

      let data = this.todoservice.getTodos();

      if (!this.todoId) {

        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((todo: any) => todo.id)) + 1;
        }

        let obj = {
          id: this.id,
          title: this.addEditTodoForm.value.title.replace(/\s+/g, ' ').trim(),
          description: this.addEditTodoForm.value.description.replace(/\s+/g, ' ').trim(),
          date: Date(),
          status: false
        }

        data.push(obj);
        this.todoservice.setTodos(data);

        this.toastr.success('To-Do added successfully');
      } else {

        let obj = {
          id: this.todoObj.id,
          title: this.addEditTodoForm.value.title.replace(/\s+/g, ' ').trim(),
          description: this.addEditTodoForm.value.description.replace(/\s+/g, ' ').trim(),
          date: this.todoObj.date,
          status: this.todoObj.status
        }

        this.todoservice.editTodo(obj, data);
        this.toastr.success('To-Do Updated successfully');

      }
      this.location.back();
    }
  }
}
