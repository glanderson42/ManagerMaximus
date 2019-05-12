import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.sass']
})
export class ChartWidgetComponent implements OnInit {

  @Input() widgetData;

  constructor() { }

  ngOnInit() {
  }

}
