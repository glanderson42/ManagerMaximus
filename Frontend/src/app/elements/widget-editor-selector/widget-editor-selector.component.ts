import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';

@Component({
  selector: 'app-widget-editor-selector',
  templateUrl: './widget-editor-selector.component.html',
  styleUrls: ['./widget-editor-selector.component.sass']
})
export class WidgetEditorSelectorComponent implements OnInit {

  widgetTypes: SelectItem[];
  selectedType: string;

  constructor(private projectSiteComponent: ProjectSiteComponent) {
    this.widgetTypes = [
      { label: 'TEXT', value: 'textWidget' , icon: 'fa fa-font'},
      { label: 'IMAGE', value: 'imageWidget', icon: 'fa fa-image'},
      { label: 'CHART', value: 'chartWidget', icon: 'fa fa-pie-chart'}
    ];
  }

  ngOnInit() {
  }

  openWidgetEditor(widgetType) {
    this.projectSiteComponent.weSelectorVisible = false;
    this.projectSiteComponent.newWeVisible = true;
    this.projectSiteComponent.newWidget.type = widgetType;
    this.selectedType = null;
  }

}
