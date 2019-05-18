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

  constructor(private authService: AuthService, private messageService: MessageService, private projectSiteComponent: ProjectSiteComponent) { }

  ngOnInit() {
    this.widget.visibility = 'PUBLIC';
  }

  get widgetData(): string {
    return this.widget;
  }

  @Input()
  set widgetData(widget) {
    this.widget = widget;
  }

  closeEditor() {
    this.closeCallback();
  }

  myUploader(event, uploader) {
    let reader = new FileReader();
    reader.onload = (e:any) => {
      this.widget.data = e.target.result;
      uploader.clear();
    }
    reader.readAsDataURL(event.files[0]);
  }

  saveWidget() {
    this.widget.projectid = this.project.id;
    this.authService.saveWidget(this.widget).subscribe(
      (response: any) => {
        if (this.widget.id) {
          this.widget = response;
        } else {
          this.project.widgets.push(response);
        }
        this.projectSiteComponent.noWidget = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
        this.closeCallback();
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }

}
