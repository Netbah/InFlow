import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  title = '';
  description = '';
  author = '';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postTask(form).subscribe(
      res => {
        const id = res['_id'];
        this.router.navigate(['/task-details', id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
