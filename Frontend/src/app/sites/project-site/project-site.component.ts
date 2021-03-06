import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: "app-project-site",
  templateUrl: "./project-site.component.html",
  styleUrls: ["./project-site.component.scss"]
})
export class ProjectSiteComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    public confirmationService: ConfirmationService
  ) {}

  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];

  public DisplayUserHandling: boolean = false;
  Project: any = {};
  showProjectEditModal: boolean = false;
  selectedProject: any = {};
  @ViewChild('userHandling') userHandling: any;
  public noWidget: boolean = true;
  weSelectorVisible: boolean = false;
  newWidget: any = {};
  newWeVisible: boolean = false;

  ngOnInit() {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.PanelMenu = [
      {
        label: "1. Create new",
        icon: "pi pi-pw pi-plus",
        expanded: true,
        items: [
          {
            label: "1. Subproject",
            icon: "fa fa-fw fa-files-o",
            command: ()=> {
              this.selectedProject = {
                parentid: this.Project.id
              };
              this.projectSaved = response => {
                let newMenuItem: MenuItem = {
                  label: response.title,
                  icon: "fa fa-fw fa-list-ol",
                  command: (event) => {
                    this.router.navigateByUrl("/project/" + response.id);
                  }
                };

                let nextItem = this.PanelMenu[2].items.length;
                this.PanelMenu[2].items[nextItem] = newMenuItem;
              };
              this.showProjectEditModal = true;
            },
          },
          {
            label: "2. Widget",
            icon: "fa fa-fw fa-stack-exchange",
            command: (event)=> {
              this.weSelectorVisible = true;
            }
          },
          { separator: true }
        ]
      },
      {
        label: "2. Users setting",
        icon: "pi pi-fw pi-users",
        command: (event) => {
          event.item.expanded = false;
          this.DisplayUserHandling = true;
          this.userHandling.getUsers(this.Project.id);
        }
      },
      {
        label: "3. Subprojects",
        icon: "fa fa-fw fa-list-alt",
        items: [],
      },
      {
        label: "Edit project",
        command: (event)=> {
          event.item.expanded = false;
          this.selectedProject = Object.assign({}, this.Project);
          this.projectSaved = response => {
            this.Project = Object.assign(this.Project, response);
          };
          this.showProjectEditModal = true;
        },
        icon: "pi pi-fw pi-cog",
      },
      {
        label: "Homepage",
        command: (event)=> {
          this.router.navigateByUrl('/');
        },
        icon: "pi pi-home",
      }
    ];

    this.route.params
    .subscribe(data => {
      this.loadProject(data.id);
    })
  }

  loadProject(id) {
    this.authService.getProjectByID(parseInt(id)).subscribe(
      (response: any) => {
        this.Project = response;
        this.noWidget = response.widgets.length ? false : true;
        this.PanelMenu[2].items = response.subprojects.map(e=>{
          return {
            label: e.title,
            icon: "fa fa-fw fa-list-ol",
            command: (event) => {
              this.router.navigateByUrl("/project/" + e.id);
            },
          }
        });
        this.PanelMenu[2].expanded = response.subprojects.length > 0;
      },
      (response: any) => {
        if (response.status === 403) {
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl('');
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Failed to get project"
          });
        }
      }
    );
  }

  closeProjectEdit:any = () => {
    this.showProjectEditModal = false;
  };
  projectSaved: any = () => {};

  closeWidgetEdit: any = () => {
    this.newWeVisible = false;
  }
}
