import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent implements OnInit {
  widget;

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

}
