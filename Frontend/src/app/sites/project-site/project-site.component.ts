import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-site',
  templateUrl: './project-site.component.html',
  styleUrls: ['./project-site.component.scss']
})
export class ProjectSiteComponent implements OnInit {

  constructor(private router: Router) { }

  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];
  Project = {};

  ngOnInit() {
  
    if(!localStorage.getItem('user')) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.PanelMenu = [
      {
        label: '1. Create new',
        icon: 'pi pi-pw pi-plus',
        items: [{
          label: '1. Subproject',
          icon: 'fa fa-fw fa-files-o',
        },
        {
          label: '2. Widget',
          icon: 'fa fa-fw fa-stack-exchange',
        },
        { separator: true },
        ]
      },
      {
        label: '2. Users',
        icon: 'pi pi-fw pi-user',
        items: [
          { 
            label: '1. Add user for this project', 
            icon: 'pi pi-fw pi-user-plus' 
          },
          { 
            label: '2. Remove user from this project', 
            icon: 'pi pi-fw pi-user-minus' 
          },
          {
            label: '3. Users on this project',
            icon: 'fa fa-fw fa-users'
          }
        ]
      },
      {
        label: '3. List',
        icon: 'fa fa-fw fa-list-alt',
        items: [
          {
            label: '1. Subprojects',
            icon: 'fa fa-fw fa-list-ol'
          },
          {
            label: '2. Widgets',
            icon: 'fa fa-fw fa-list-ol'
          },
        ]
      }
    ]

    this.Project = {

          "id": 2,
          "authorid": 1,
          "parentid": 1,
          "title": "First subproject",
          "description": "First project description",
          "created": "2019-04-14T12:06:29.000Z",
          "deadline": "2019-09-18T04:22:05.000Z",
          "category": "NEW",
          "priority": "MID",
          "widgets": [
              {
                  "id": 1,
                  "authorid": 1,
                  "projectid": 2,
                  "title": "First widget",
                  "data": "{}",
                  "comments": "[]",
                  "date": "2019-04-14T12:06:29.000Z",
                  "lastmodified": "2019-04-14T12:06:29.000Z",
                  "visibility": "PUBLIC"
              },
              {
                  "id": 2,
                  "authorid": 1,
                  "projectid": 2,
                  "title": "Second widget",
                  "data": "{}",
                  "comments": "[]",
                  "date": "2019-04-14T12:06:29.000Z",
                  "lastmodified": "2019-04-14T12:06:29.000Z",
                  "visibility": "OWN"
              }
          ]
       }
  }
}
