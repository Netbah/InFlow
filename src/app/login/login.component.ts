import { Component } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'Helloworld';
  token = '';

  constructor(private fb: FacebookService, private http: Http) {
    console.log('Initializing Facebook');

    let initParams: InitParams = {
      appId: '1901994843219025',
      xfbml: true,
      version: 'v3.1'
    };

    fb.init(initParams);
  }

  /**
   * Login with minimal permissions. This allows you to see their public profile only.
   */
  login() {
    this.fb
      .login()
      .then((res: any) => {
        console.log('Logged in', res);
        this.token = res.authResponse.accessToken;
      })
      .catch(this.handleError);
  }

  getProtected() {
    let header: Headers = new Headers();
    console.log('token is ', this.token);
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: header });

    this.http
      .get('/protected', options)
      .toPromise()
      .then(res => {
        console.log('response from server', res.status);
        if (res.status == 200) {
          console.log('read ', res.json());
          return res.json();
        } else if (res.status == 401) {
          return null;
        } else {
          throw new Error('This request has failed ' + res.status);
        }
      })
      .catch(err => console.error('got error', err));
  }

  getProtectedWrongToken() {
    let wrongToken = this.token.substr(0, this.token.length - 2) + 'f';
    let header: Headers = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + wrongToken);
    let options = new RequestOptions({ headers: header });

    this.http
      .get('protected', options)
      .toPromise()
      .then(res => {
        console.log('response from server', res.status);
        if (res.status == 200) {
          console.log('read ', res.json());
          return res.json();
        } else if (res.status == 401) {
          return null;
        } else {
          throw new Error('This request has failed ' + res.status);
        }
      })
      .catch(err => console.error('got error', err));
  }

  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }
}
