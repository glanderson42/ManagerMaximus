import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    document.getElementById('btnOpenSidebar').addEventListener('click', () => {
      const sidebar = document.querySelector('.layout-sidebar');
      if (sidebar.className.includes('opened')) {
        sidebar.className = sidebar.className.replace('opened', '');
      } else {
        sidebar.className = sidebar.className + ' opened';
      }
    });
  }

  logoutUser() {
    this.authService.logout().subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );

    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  goToMainPage() {
    this.router.navigateByUrl('');
  }

}
