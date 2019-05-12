import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.sass']
})
export class ImageWidgetComponent implements OnInit {

  @Input() widgetData;

  constructor() { }

  ngOnInit() {
  }

}
