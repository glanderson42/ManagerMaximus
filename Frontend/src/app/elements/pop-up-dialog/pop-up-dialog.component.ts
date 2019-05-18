import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AuthService } from "../../services/auth/auth.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent implements OnInit {

  categories: SelectItem[];
  priorities: SelectItem[];
  project;

  constructor(
    private authService: AuthService,
    public messageService: MessageService,
  ) {
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

  @Input() closeCallback: any;
  @Input() savedCallback: any;

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

  saveUserSettings(){
    this.authService.editProject(this.project).subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.label});
        this.savedCallback(response);
        this.closeCallback();
      },
      (response: any) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }
  closeUserSettings(){
    this.closeCallback();
  }
}
