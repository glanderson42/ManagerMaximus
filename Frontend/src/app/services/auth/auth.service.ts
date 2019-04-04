import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../config/config';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginData) {
      return this.httpClient.post(config.backendUrl + 'login', loginData);
  }

  logout() {
  return this.httpClient.get(config.backendUrl + 'logout');
}

  /*register(user: User) {
    return this.http.post(Server.routeTo(Routes.REGISTER), user)
      .map(res => {
        this.isLoggedIn = true;
        this.user = res.json();
        return this.user;
      });
  }
*/
}
