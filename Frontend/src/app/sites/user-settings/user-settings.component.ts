import { Component, OnInit } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

export class UserSettingsComponent implements OnInit {
  userDetails: any;

  constructor(private index: IndexComponent, private authService: AuthService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }

  closeUserSettings() {
    this.index.showUserEdit = false;
  }

  saveUserSettings() {
    console.log(this.userDetails);
    this.authService.saveUserEdit(this.userDetails).subscribe(
      (response: any) => {
        this.index.showUserEdit = false;
      },
      (response: any) => {
        this.index.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }

}
