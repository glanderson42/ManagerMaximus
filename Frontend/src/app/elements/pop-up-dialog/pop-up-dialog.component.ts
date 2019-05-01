import { Component, OnInit, Input } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { callbackify } from 'util';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.sass']
})
export class PopUpDialogComponent implements OnInit {

  constructor() { }   

  @Input() project;

  ngOnInit() {
    console.log(this.project);
  }
}
