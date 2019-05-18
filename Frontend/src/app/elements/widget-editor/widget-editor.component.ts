import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent implements OnInit {
  widget;

  @Input() closeCallback: any;
  @Input() project: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private projectSiteComponent: ProjectSiteComponent
  ) { }

  ngOnInit() {
    this.widget.visibility = 'PUBLIC';
  }

  get widgetData(): string {
    return this.widget;
  }

  @Input()
  set widgetData(widget) {
    this.widget = widget;
    this.widget.visibility = 'PUBLIC';
    if (!this.widget.id) {
      this.widget.data = '';
      this.widget.title = '';
    }
  }

  closeEditor() {
    this.closeCallback();
  }

  myUploader(event, uploader) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.widget.data = e.target.result;
      uploader.clear();
    };
    reader.readAsDataURL(event.files[0]);
  }

  saveWidget() {
    this.widget.projectid = this.project.id;
    this.authService.saveWidget(this.widget).subscribe(
      (response: any) => {
        if (this.widget.id) {
          const modWidget = this.widget;
          const originalWidget = this.project.widgets.find(function(widget) {
            return widget.id === modWidget.id;
          });
          const widgetIndex = this.project.widgets.indexOf(originalWidget);
          this.project.widgets[widgetIndex] = response;
        } else {
          this.project.widgets.push(response);
        }
        this.projectSiteComponent.noWidget = false;
        this.closeCallback();
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }

}
