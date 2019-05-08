import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent implements OnInit {

  categories: SelectItem[];
  priorities: SelectItem[];
  project;

  constructor() {
    this.categories = [
      { label: 'NEW', value: 'NEW' },
      { label: 'PROGRESS', value: 'PROGRESS' },
      { label: 'TESTING', value: 'TESTING' },
      { label: 'READY', value: 'READY' }
    ];
    this.priorities = [
      { label: 'LOW', value: 'LOW' },
      { label: 'MID', value: 'MID' },
      { label: 'HIGH', value: 'HIGH' }
    ];
  }

  get projectData(): string {
    return this.project;
  }

  @Input()
  set projectData(project) {
    this.project = project;
  }

  ngOnInit() {
  }

  myUploader(event, uploader) {
    let reader = new FileReader();
    reader.onload = (e:any) => {
      this.project.headerimage = e.target.result;
      uploader.clear();
    }
    reader.readAsDataURL(event.files[0]);
  }
}
