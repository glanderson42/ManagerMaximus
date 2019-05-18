import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';

@Component({
  selector: 'app-widget-router',
  templateUrl: './widget-router.component.html',
  styleUrls: ['./widget-router.component.scss']
})
export class WidgetRouterComponent implements OnInit {

  @Input() widgetData;
  @Input() project: any;
  public weVisible: boolean = false;
  selectedWidget: any = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private projectSiteComponent: ProjectSiteComponent
  ) { }

  ngOnInit() {
  }

  showWidgetEditor(item, event) {
    if (typeof item != 'object') {
      item = {};
    }
    this.weVisible = true;
    this.selectedWidget = Object.assign({}, item);
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  closeWidgetEdit: any = () => {
    this.weVisible = false;
  }

  deleteWidget(widgetData) {
    this.projectSiteComponent.confirmationService.confirm({
      message: 'Are you sure want to delete this widget?',
      header: 'Delete confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.authService.deleteWidget(widgetData.id).subscribe(
          (response: any) => {
            const widgetIndex = this.project.widgets.indexOf(widgetData);
            this.project.widgets.splice(widgetIndex, 1);
            this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
          },
          (response: any ) => {
            this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
          }
        );
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Info Message', detail: 'Project was NOT deleted.'});
      }
    });
  }

}
