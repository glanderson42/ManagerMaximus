import { Component, OnInit, Input } from '@angular/core';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.scss']
})
export class UserHandlingComponent implements OnInit {

  constructor(private projectSite: ProjectSiteComponent,
              private authService: AuthService) { }

Users: any = {};

@Input() projectID;

  ngOnInit() {
    setTimeout(function(){
      console.log(this.projectID);
    }, 2000);
  }
  
  closeUserHandling(event) {
    this.projectSite.DisplayUserHandling = false;
  }

  getUsers(projectID: Number) {
    this.authService.listUsersForProject(projectID).subscribe(
      (response: any) => {
        this.Users = response;

      }
    )
  }

}
