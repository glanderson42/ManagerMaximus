import { Component, OnInit, Input } from '@angular/core';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';
import { AuthService } from "../../services/auth/auth.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.scss']
})
export class UserHandlingComponent implements OnInit {

  constructor(
    private projectSite: ProjectSiteComponent,
    private authService: AuthService,
    public messageService: MessageService,
  ) { }

  Users: any = [];
  projectID: any = {};
  newValue: any = "";

  ngOnInit() {
  }

  closeUserHandling() {
    this.projectSite.DisplayUserHandling = false;
  }

  getUsers(id: Number) {
    this.projectID = id;
    this.authService.listUsersForProject(id).subscribe(
      (response: any) => {
        this.Users = response;
      }
    )
  }

  userDelete(id: Number) {
    this.authService.removeUserFromProject(this.projectID, id).subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
        for(let i=0; i<this.Users.length; i++) {
          if(this.Users[i].id === id) {
            this.Users.splice(i, 1)
            break;
          }
        }
      },
      (response: any) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }
  addNewUser() {
    if(this.newValue === "") {
      return;
    }

    this.authService.addUserForProject(this.projectID, this.newValue).subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
        this.Users.push(response);
        this.newValue = "";
      },
      (response: any) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
        this.newValue = "";
      }
    );
  }
}
