import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit {

  @Input() widgetData;
  chartData;

  constructor() {
  }

  ngOnInit() {
    this.chartData = JSON.parse(this.widgetData.data);

  }

}
