import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { config } from '../../../../config/config';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginData) {
    return this.httpClient.post(config.backendUrl + 'login', loginData);
  }

  logout() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = new HttpHeaders(
      {Authorization: 'Bearer ' + user.token}
    );

    return this.httpClient.get(config.backendUrl + 'logout', {headers});
  }

  register(registrationData) {
    return this.httpClient.post(config.backendUrl + 'registration', registrationData);
  }

  getProjects() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = new HttpHeaders(
      {Authorization: 'Bearer ' + user.token}
      );

    return this.httpClient.get(config.backendUrl + 'projects/list', {headers});
  }
}
