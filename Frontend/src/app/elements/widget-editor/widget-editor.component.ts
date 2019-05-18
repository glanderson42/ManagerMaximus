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
  chartDataArray: any = [];

  @Input() closeCallback: any;
  @Input() project: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private projectSiteComponent: ProjectSiteComponent
  ) { }

  ngOnInit() {
    this.widget.visibility = 'PUBLIC';
  }

  get widgetData(): string {
    return this.widget;
  }

  @Input()
  set widgetData(widget) {
    this.widget = widget;
    this.widget.visibility = 'PUBLIC';
    if (!this.widget.id) {
      this.widget.data = '';
      this.widget.title = '';
      if (this.widget.type === 'chartWidget') {
        this.chartDataArray = [];
        this.chartDataArray.push(
          {
            label: '',
            value: null,
            color: '#ffffff'
          }
        );
      }
    } else if (this.widget.type === 'chartWidget') {
      const chartWidgetData = JSON.parse(this.widget.data);
      const chartLabels = chartWidgetData.labels;
      const chartValues = chartWidgetData.datasets[0].data;
      const chartColors = chartWidgetData.datasets[0].backgroundColor;

      for (let i = 0; i < chartLabels.length; i++) {
        this.chartDataArray.push(
          {
            label: chartLabels[i],
            value: chartValues[i],
            color: chartColors[i]
          }
        );
      }
    }
  }

  closeEditor() {
    this.closeCallback();
  }

  myUploader(event, uploader) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.widget.data = e.target.result;
      uploader.clear();
    };
    reader.readAsDataURL(event.files[0]);
  }

  addPieChart() {
    this.chartDataArray.push(
      {
        label: '',
        value: null,
        color: '#ffffff'
      }
    );
  }

  saveWidget() {
    this.widget.projectid = this.project.id;

    if (this.widget.type === 'chartWidget') {
      const labelArray = [];
      const valueArray = [];
      const colorArray = [];

      this.chartDataArray.forEach(function(chartData) {
        labelArray.push(chartData.label);
        valueArray.push(chartData.value);
        colorArray.push(chartData.color);
      });

      this.widget.data = JSON.stringify(
        {
          labels: labelArray,
          datasets: [
            {
              data: valueArray,
              backgroundColor: colorArray,
              hoverBackgroundColor: colorArray
            }
          ]
        }
      );
    }

    this.authService.saveWidget(this.widget).subscribe(
      (response: any) => {
        if (this.widget.id) {
          const modWidget = this.widget;
          const originalWidget = this.project.widgets.find(function(widget) {
            return widget.id === modWidget.id;
          });
          const widgetIndex = this.project.widgets.indexOf(originalWidget);
          this.project.widgets[widgetIndex] = response;
        } else {
          this.project.widgets.push(response);
        }
        this.projectSiteComponent.noWidget = false;
        this.closeCallback();
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }

}
