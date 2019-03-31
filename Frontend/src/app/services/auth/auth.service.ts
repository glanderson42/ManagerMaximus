import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User';

@Injectable()
export class AuthService {
  user: User;
  isLoggedIn = false;

  constructor(private httpClient: HttpClient) {
    this.user = new User();
  }

  login(user: User) {
      console.log(user);
      return this.httpClient.post('BACKENDURL', user)
      .subscribe(
          (data: any) => {
            console.log('LOGIN');
          }
      );
  }

  logout() {
  return this.httpClient.get('BACKENDURL')
    .subscribe(
        (data: any[]) => {
          console.log('LOGOUT');
        }
    );
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
