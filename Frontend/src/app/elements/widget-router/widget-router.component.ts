import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-router',
  templateUrl: './widget-router.component.html',
  styleUrls: ['./widget-router.component.scss']
})
export class WidgetRouterComponent implements OnInit {

  @Input() widgetData;

  constructor() { }

  ngOnInit() {
  }

}
