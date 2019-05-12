import { Component, OnInit } from '@angular/core';
import { ProjectSiteComponent } from '../project-site/project-site.component';

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.scss']
})
export class UserHandlingComponent implements OnInit {

  constructor(private projectSite: ProjectSiteComponent) { }

TempUsers = {
    users: [
        {
            email: 'asd@asd.com',
            username: 'asd',
            id: 1,
        },
        {
          email: 'asdss@asd.com',
          username: 'assssd',
          id: 2,
        },
    ]
 };
  ngOnInit() {
  }

  closeUserHandling(event) {
    this.projectSite.DisplayUserHandling = false;
  }

}
