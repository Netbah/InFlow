import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task = {};
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getTaskDetails(this.route.snapshot.params['id']);
  }

  getTaskDetails(id) {
    this.api.getTask(id).subscribe(data => {
      console.log(data);
      this.task = data;
    });
  }

  deleteTask(id) {
    this.api.deleteTask(id).subscribe(
      res => {
        this.router.navigate(['/tasks']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
