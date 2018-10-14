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
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
var TaskDetailComponent = /** @class */ (function () {
    function TaskDetailComponent(route, api, router) {
        this.route = route;
        this.api = api;
        this.router = router;
        this.task = {};
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        this.getTaskDetails(this.route.snapshot.params['id']);
    };
    TaskDetailComponent.prototype.getTaskDetails = function (id) {
        var _this = this;
        this.api.getTask(id).subscribe(function (data) {
            console.log(data);
            _this.task = data;
        });
    };
    TaskDetailComponent.prototype.deleteTask = function (id) {
        var _this = this;
        this.api.deleteTask(id).subscribe(function (res) {
            _this.router.navigate(['/tasks']);
        }, function (err) {
            console.log(err);
        });
    };
    TaskDetailComponent = __decorate([
        Component({
            selector: 'app-task-detail',
            templateUrl: './task-detail.component.html',
            styleUrls: ['./task-detail.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ApiService, Router])
    ], TaskDetailComponent);
    return TaskDetailComponent;
}());
export { TaskDetailComponent };
//# sourceMappingURL=task-detail.component.js.map