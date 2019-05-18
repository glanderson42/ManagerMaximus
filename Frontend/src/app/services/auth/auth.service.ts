import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { config } from "../../../../config/config";

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginData) {
    return this.httpClient.post(config.backendUrl + "login", loginData);
  }

  logout() {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "logout", { headers });
  }

  register(registrationData) {
    return this.httpClient.post(
      config.backendUrl + "registration",
      registrationData
    );
  }

  getProjects() {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "projects/list", {
      headers
    });
  }

  getProjectByID(Id: Number) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "projects/" + Id, {
      headers
    });
  }

  deleteProjectByID(id: Number) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.delete(config.backendUrl + "projects/" + id, {
      headers
    });
  }

  saveUserEdit(newData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.put(config.backendUrl + "user", newData, {
      headers
    });
  }

  listUsersForProject(projectID: Number) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

    return this.httpClient.get(config.backendUrl + "projects/" + projectID + "/user/list", {
      headers
    });
  }

    removeUserFromProject(projectID: Number, userID: Number) {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

      return this.httpClient.delete(config.backendUrl + "projects/" + projectID + "/user/" + userID, {
        headers
      });
    }

    addUserForProject(projectID: Number, userID: any) {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = new HttpHeaders({ Authorization: "Bearer " + user.token });

      return this.httpClient.put(config.backendUrl + "projects/" + projectID + "/user/" + userID, {}, {
        headers
      });
    }
}
