import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent implements OnInit {
  widget;

  @Input() closeCallback: any;

  constructor() { }

  ngOnInit() {
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

}
