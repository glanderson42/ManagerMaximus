import { Component, OnInit } from "@angular/core";
import { MenuItem, Message } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];
  Projects: any = {};
  selectedProject: any = {};

  ngOnInit() {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.PanelMenu = [
      {
        label: "New Project",
        icon: "pi pi-pw pi-plus",
        command: (event)=> {
          event.item.expanded = false;
          this.showDialog(null, null);
        },
      },
      {
        label: "Manage Projects",
        icon: "pi pi-list",
        items: [],
      },
      {
        label: "Edit user",
        command: (event)=> {
          event.item.expanded = false;
          this.showUserEdit = true;
        },
        icon: "pi pi-fw pi-cog",
      },
      {
        label: "Logout",
        command: (event)=> {
          event.item.expanded = false;
          this.logoutUser()
        },
        icon: "pi pi-fw pi-sign-out",
      }
    ];

    this.authService.getProjects().subscribe(
      (response: any) => {
        this.Projects = response;
        this.PanelMenu[1].items = response.own.map(e => {
          return {
            label: e.title,
            items: [
              {
                label:"Open",
                icon: "pi pi-plus",
                command: (event)=> {
                  this.openProject(e);
                },
              },
              {
                label:"Edit",
                icon: "pi pi-cog",
                command: (event)=> {
                  this.showDialog(e, event);
                },
              },
              {
                label:"Delete",
                icon: "pi pi-times",
                command: (event)=> {
                  this.deleteProject(e, event);
                },
              },
            ],
          };
        });
      },
      (response: any) => {
        if (response.status === 403) {
          this.router.navigateByUrl("/login");
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Failed to get projects"
          });
        }
      }
    );
  }

  logoutUser() {
    this.authService.logout().subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );

    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public display: boolean = false;
  public showUserEdit: boolean = false;

  showDialog(item, event) {
    if (typeof item != 'object') {
      item = {};
    }
    this.display = true;
    this.selectedProject = item;
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  hideDialog() {
    console.log("hideDialog()");
    this.display = false;
  }

  openProject(item) {
    this.router.navigateByUrl("/project/" + item.id);
  }

  deleteProject(item, event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.confirmationService.confirm({
      message: "Are you sure want to delete this project?",
      header: "Delete confirmation",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.authService.deleteProjectByID(item.id).subscribe(
          (response: any) => {
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'Project was deleted.'});
            item.deleted = true;
          },
          (response: any) => {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Project was NOT deleted.'});
          }
        );
      },
      reject: () => {
        this.messageService.add({severity:'info', summary: 'Info Message', detail:'Project was NOT deleted.'});
      }
    });

  }
}
