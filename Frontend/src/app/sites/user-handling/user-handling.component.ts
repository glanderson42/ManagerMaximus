import { Component, OnInit } from '@angular/core';
import { ProjectSiteComponent } from '../project-site/project-site.component';

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.sass']
})
export class UserHandlingComponent implements OnInit {

  constructor(private projectSite: ProjectSiteComponent) { }

  ngOnInit() {
  }

  closeUserHandling(event) {
    this.projectSite.DisplayUserHandling = false;
  }

}
