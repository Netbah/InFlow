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
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
var TaskCreateComponent = /** @class */ (function () {
    function TaskCreateComponent(router, api, formBuilder) {
        this.router = router;
        this.api = api;
        this.formBuilder = formBuilder;
        this.title = '';
        this.description = '';
        this.author = '';
    }
    TaskCreateComponent.prototype.ngOnInit = function () {
        this.taskForm = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            author: [null, Validators.required]
        });
    };
    TaskCreateComponent.prototype.onFormSubmit = function (form) {
        var _this = this;
        this.api.postTask(form).subscribe(function (res) {
            var id = res['_id'];
            _this.router.navigate(['/task-details', id]);
        }, function (err) {
            console.log(err);
        });
    };
    TaskCreateComponent = __decorate([
        Component({
            selector: 'app-task-create',
            templateUrl: './task-create.component.html',
            styleUrls: ['./task-create.component.css']
        }),
        __metadata("design:paramtypes", [Router, ApiService, FormBuilder])
    ], TaskCreateComponent);
    return TaskCreateComponent;
}());
export { TaskCreateComponent };
//# sourceMappingURL=task-create.component.js.map