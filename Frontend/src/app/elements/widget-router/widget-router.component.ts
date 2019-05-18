import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  showWidgetEditor(item, event) {
    if (typeof item != 'object') {
      item = {};
    }
    this.weVisible = true;
    this.selectedWidget = item;
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  closeWidgetEdit: any = () => {
    this.weVisible = false;
  }

  deleteWidget(widgetData) {

  }

}
