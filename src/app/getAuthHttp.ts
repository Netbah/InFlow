import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function getAuthHttp(http: Http) {
  return new AuthHttp(
    new AuthConfig({
      headerName: 'x-auth-token',
      noTokenScheme: true,
      noJwtError: true,
      globalHeaders: [{ Accept: 'application/json' }],
      tokenGetter: () => localStorage.getItem('id_token')
    }),
    http
  );
}
