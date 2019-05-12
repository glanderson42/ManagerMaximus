import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit {

  @Input() widgetData;

  constructor() { }

  ngOnInit() {
  }

}
