var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { TaskDataSource } from '../TaskDataSource';
var TaskComponent = /** @class */ (function () {
    function TaskComponent(api) {
        this.api = api;
        this.displayedColumns = ['title', 'description', 'author'];
        this.dataSource = new TaskDataSource(this.api);
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getTasks().subscribe(function (res) {
            console.log(res);
            _this.tasks = res;
        }, function (err) {
            console.log(err);
        });
    };
    TaskComponent = __decorate([
        Component({
            selector: 'app-task',
            templateUrl: './task.component.html',
            styleUrls: ['./task.component.css']
        }),
        __metadata("design:paramtypes", [ApiService])
    ], TaskComponent);
    return TaskComponent;
}());
export { TaskComponent };
//# sourceMappingURL=task.component.js.map