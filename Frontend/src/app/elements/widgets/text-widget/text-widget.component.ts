import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit {
  @ViewChild('widgetContent') widgetContent: any;

  get widgetData(){
    return this.savedWidgetData;
  }

  @Input() set widgetData(set){
    this.savedWidgetData = set;
    this.convertedText = set.data;
    this.convertedText = this.convertedText.replace(/([^"])((?:http|ftp|https):\/\/(?:[\w+?\.\w+])+(?:[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*))([^"])/g, '$1<a href="$2" target="_blank">$2</a>$3');
    this.convertedText = this.convertedText.replace(/\n/g, '<br>');
    this.widgetContent.nativeElement.innerHTML = this.convertedText;
  }

  convertedText: String = "";
  savedWidgetData: any;

  constructor() { }

  ngOnInit() {
  }

}
