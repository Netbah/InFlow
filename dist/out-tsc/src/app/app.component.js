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
import { Headers, RequestOptions, Http } from '@angular/http';
import { FacebookService } from 'ngx-facebook';
var AppComponent = /** @class */ (function () {
    function AppComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.title = 'Helloworld';
        this.token = '';
        console.log('Initializing Facebook');
        var initParams = {
            appId: '1901994843219025',
            xfbml: true,
            version: 'v3.1'
        };
        fb.init(initParams);
    }
    /**
     * Login with minimal permissions. This allows you to see their public profile only.
     */
    AppComponent.prototype.login = function () {
        var _this = this;
        this.fb
            .login()
            .then(function (res) {
            console.log('Logged in', res);
            _this.token = res.authResponse.accessToken;
        })
            .catch(this.handleError);
    };
    AppComponent.prototype.getProtected = function () {
        var header = new Headers();
        console.log('token is ', this.token);
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.token);
        var options = new RequestOptions({ headers: header });
        this.http
            .get('/protected', options)
            .toPromise()
            .then(function (res) {
            console.log('response from server', res.status);
            if (res.status == 200) {
                console.log('read ', res.json());
                return res.json();
            }
            else if (res.status == 401) {
                return null;
            }
            else {
                throw new Error('This request has failed ' + res.status);
            }
        })
            .catch(function (err) { return console.error('got error', err); });
    };
    AppComponent.prototype.getProtectedWrongToken = function () {
        var wrongToken = this.token.substr(0, this.token.length - 2) + 'f';
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + wrongToken);
        var options = new RequestOptions({ headers: header });
        this.http
            .get('protected', options)
            .toPromise()
            .then(function (res) {
            console.log('response from server', res.status);
            if (res.status == 200) {
                console.log('read ', res.json());
                return res.json();
            }
            else if (res.status == 401) {
                return null;
            }
            else {
                throw new Error('This request has failed ' + res.status);
            }
        })
            .catch(function (err) { return console.error('got error', err); });
    };
    /**
     * This is a convenience method for the sake of this example project.
     * Do not use this in production, it's better to handle errors separately.
     * @param error
     */
    AppComponent.prototype.handleError = function (error) {
        console.error('Error processing action', error);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [FacebookService, Http])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map