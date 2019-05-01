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

  @Input() project;

  ngOnInit() {
    console.log(this.project);
  }

  cancelEdit() {

  }
}
