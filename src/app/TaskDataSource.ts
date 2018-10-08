import { DataSource } from '@angular/cdk/table';
import { ApiService } from './api.service';

export class TaskDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getTasks();
  }

  disconnect() {}
}
