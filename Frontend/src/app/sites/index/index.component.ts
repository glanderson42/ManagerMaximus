import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }
  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];
  Projects = {};
  selectedProject = {};

  ngOnInit() {

    if (!localStorage.getItem('user')) {
      this.router.navigateByUrl('/login');
      return;
    }

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

    this.authService.getProjects().subscribe(
      (response: any) => {
        this.Projects = response;
      },
      (response: any ) => {
        if (response.status === 403) {
          this.router.navigateByUrl('/login');
        } else {
          this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Failed to get projects'});
        }
      }
    );
  }

  display: boolean = false;

  showDialog(item) {
      this.display = true;
      if (item) {
        this.selectedProject = item;
      } else {
        this.selectedProject = {
          title: '',
          description: '',
          category: 'NEW',
          priority: 'LOW'
        };
      }
  }

  hideDialog() {
    console.log('hideDialog()');
    this.display = false;
  }
}
