import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MessageService } from "primeng/api";
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
    private route: ActivatedRoute
  ) {}

  MenuBar: MenuItem[];
  PanelMenu: MenuItem[];
  Project = {};

  ngOnInit() {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.PanelMenu = [
      {
        label: "1. Create new",
        icon: "pi pi-pw pi-plus",
        items: [
          {
            label: "1. Subproject",
            icon: "fa fa-fw fa-files-o"
          },
          {
            label: "2. Widget",
            icon: "fa fa-fw fa-stack-exchange"
          },
          { separator: true }
        ]
      },
      {
        label: "2. Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "1. Add user for this project",
            icon: "pi pi-fw pi-user-plus"
          },
          {
            label: "2. Remove user from this project",
            icon: "pi pi-fw pi-user-minus"
          },
          {
            label: "3. Users on this project",
            icon: "fa fa-fw fa-users"
          }
        ]
      },
      {
        label: "3. List",
        icon: "fa fa-fw fa-list-alt",
        items: [
          {
            label: "1. Subprojects",
            icon: "fa fa-fw fa-list-ol"
          },
          {
            label: "2. Widgets",
            icon: "fa fa-fw fa-list-ol"
          }
        ]
      }
    ];

    const id = this.route.snapshot.paramMap.get("id");
    this.authService.getProjectByID(parseInt(id)).subscribe(
      (response: any) => {
        this.Project = response;
      },
      (response: any) => {
        if (response.status === 403) {
          this.router.navigateByUrl("");
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Failed to get project"
          });
        }
      }
    );
  }
}
