import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  id = '';
  title = '';
  description = '';
  author = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getTask(this.route.snapshot.params['id']);
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required]
    });
  }
  getTask(id) {
    this.api.getTask(id).subscribe(data => {
      this.id = data._id;
      this.taskForm.setValue({
        title: data.title,
        description: data.description,
        author: data.author
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateTask(this.id, form).subscribe(
      res => {
        const id = res['_id'];
        this.router.navigate(['/task-details', id]);
      },
      err => {
        console.log(err);
      }
    );
  }

  taskDetails() {
    this.router.navigate(['/task-details', this.id]);
  }
}
