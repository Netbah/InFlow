import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TaskDataSource } from '../TaskDataSource';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any;
  displayedColumns = ['title', 'description', 'author'];
  dataSource = new TaskDataSource(this.api);
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTasks().subscribe(
      res => {
        console.log(res);
        this.tasks = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
