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
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
var TaskEditComponent = /** @class */ (function () {
    function TaskEditComponent(router, route, api, formBuilder) {
        this.router = router;
        this.route = route;
        this.api = api;
        this.formBuilder = formBuilder;
        this.id = '';
        this.title = '';
        this.description = '';
        this.author = '';
    }
    TaskEditComponent.prototype.ngOnInit = function () {
        this.getTask(this.route.snapshot.params['id']);
        this.taskForm = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            author: [null, Validators.required]
        });
    };
    TaskEditComponent.prototype.getTask = function (id) {
        var _this = this;
        this.api.getTask(id).subscribe(function (data) {
            _this.id = data._id;
            _this.taskForm.setValue({
                title: data.title,
                description: data.description,
                author: data.author
            });
        });
    };
    TaskEditComponent.prototype.onFormSubmit = function (form) {
        var _this = this;
        this.api.updateTask(this.id, form).subscribe(function (res) {
            var id = res['_id'];
            _this.router.navigate(['/task-details', id]);
        }, function (err) {
            console.log(err);
        });
    };
    TaskEditComponent.prototype.taskDetails = function () {
        this.router.navigate(['/task-details', this.id]);
    };
    TaskEditComponent = __decorate([
        Component({
            selector: 'app-task-edit',
            templateUrl: './task-edit.component.html',
            styleUrls: ['./task-edit.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            ApiService,
            FormBuilder])
    ], TaskEditComponent);
    return TaskEditComponent;
}());
export { TaskEditComponent };
//# sourceMappingURL=task-edit.component.js.map