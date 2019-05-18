import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { config } from "../../../../config/config";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginData) {
    return this.httpClient
    .post(config.backendUrl + "login", loginData)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  logout() {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "logout", { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  register(registrationData) {
    return this.httpClient.post(
      config.backendUrl + "registration",
      registrationData
    )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  getProjects() {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "projects/list", {
      headers
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  getProjectByID(Id: Number) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "projects/" + Id, {
      headers
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  deleteProjectByID(id: Number) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.delete(config.backendUrl + "projects/" + id, {
      headers
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  saveUserEdit(newData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.put(config.backendUrl + "user", newData, {
      headers
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error:\nError: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Server-side error:\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
