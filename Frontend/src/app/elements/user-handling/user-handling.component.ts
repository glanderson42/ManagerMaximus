import { Component, OnInit, Input } from '@angular/core';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.scss']
})
export class UserHandlingComponent implements OnInit {

  constructor(
    private projectSite: ProjectSiteComponent,
    private authService: AuthService
  ) { }

  Users: any = [];
  projectID: any = {};
  newValue: any = "as";

  ngOnInit() {
  }

  closeUserHandling(event) {
    this.projectSite.DisplayUserHandling = false;
  }

  getUsers(id: Number) {
    this.projectID = id;
    this.authService.listUsersForProject(id).subscribe(
      (response: any) => {
        this.Users = response;
        console.log(this.Users)
      }
    )
  }

  userDelete(id: Number) {
    console.log(id)
  }
  addNewUser() {
    console.log(this.newValue)
  }
}
