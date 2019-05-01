import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-site',
  templateUrl: './project-site.component.html',
  styleUrls: ['./project-site.component.sass']
})
export class ProjectSiteComponent implements OnInit {

  constructor(private router: Router) { }

  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];
  Projects = {};

  ngOnInit() {
  
    // if(!localStorage.getItem('user')){
    //   this.router.navigateByUrl('/login');
    //   return;
    // }

    this.PanelMenu = [
      {
        label: '1. Main Placeholder',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: '1. Sub Placeholder',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: '1. Sub-sub Placeholder', icon: 'pi pi-fw pi-user-plus' },
            { label: '2. Sub-sub Placeholder', icon: 'pi pi-fw pi-filter' }
          ]
        },
        { label: '2. Sub Placeholder', icon: 'pi pi-fw pi-external-link' },
        { separator: true },
        { label: '3. Sub Placeholder', icon: 'pi pi-fw pi-times' }
        ]
      },
      {
        label: '2. Main Placeholder',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: '4. Sub Placeholder', icon: 'pi pi-fw pi-trash' },
          { label: '5. Sub Placeholder', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: '3. Main Placeholder',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: '6. Sub Placeholder',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: '7. Sub Placeholder',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: '3. Sub-sub Placeholder',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: '4. Sub-sub Placeholder',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: '4. Main Placeholder',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: '8. Sub Placeholder',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: '5. Sub-sub Placeholder', icon: 'pi pi-fw pi-save' },
              { label: '6. Sub-sub Placeholder', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: '9. Sub Placeholder',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: '7. Sub-sub Placeholder', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ];

    this.Projects = {

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
