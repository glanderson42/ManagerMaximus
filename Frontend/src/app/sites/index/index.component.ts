import { Component, OnInit } from "@angular/core";
import { MenuItem, Message } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from "primeng/api";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
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
  Projects = {};
  selectedProject = {};
  msgs: Message[] = [];

  ngOnInit() {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.PanelMenu = [
      {
        label: "New Project",
        icon: "pi pi-pw pi-plus",
        items: [
          {
            label: "1. Sub Placeholder",
            icon: "pi pi-fw pi-plus",
            items: [
              {
                label: "1. Sub-sub Placeholder",
                icon: "pi pi-fw pi-user-plus"
              },
              { label: "2. Sub-sub Placeholder", icon: "pi pi-fw pi-filter" }
            ]
          },
          { label: "2. Sub Placeholder", icon: "pi pi-fw pi-external-link" },
          { separator: true },
          { label: "3. Sub Placeholder", icon: "pi pi-fw pi-times" }
        ]
      },
      {
        label: "Manage Projects",
        icon: "pi pi-fw pi-list",
        items: [
          { label: "4. Sub Placeholder", icon: "pi pi-fw pi-trash" },
          { label: "5. Sub Placeholder", icon: "pi pi-fw pi-refresh" }
        ]
      },
      {
        label: "Edit user",
        command: (event)=> { this.showUserEdit = true; },
        icon: "pi pi-fw pi-cog",
      },
      {
        label: "Logout",
        command: (event)=> { this.logoutUser() },
        icon: "pi pi-fw pi-sign-out",
      }
    ];

    this.authService.getProjects().subscribe(
      (response: any) => {
        this.Projects = response;
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
    this.display = true;
    this.selectedProject = item;
    event.stopPropagation();
  }

  hideDialog() {
    console.log("hideDialog()");
    this.display = false;
  }

  openProject(item) {
    console.log("ASDASDASDASDASDASD");
    this.router.navigateByUrl("/project/" + item.id);
  }

  deleteProject(item, event) {
    event.stopPropagation();
    // console.log("DELETE");
    this.confirmationService.confirm({
      message: "Are you want to delete this project?",
      header: "Delete confirmation",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: "You have deleted this project"}];
        this.authService.deleteProjectByID(item.id).subscribe(
          (response: any) => {
            console.log("Sikeres torles");
          },
          (response: any) => {
            console.log(response);
          }
        );
        window.location.reload();
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  
  }
}
