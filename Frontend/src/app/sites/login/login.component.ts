import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
  }

  submitLogin() {
    const loginData = {
      username: this.username.value,
      password: this.password.value
    };

    this.authService.login(loginData).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        // TODO navigate to main page
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
        console.log(response.error.label);
      }
    );
  }

  submitLogout() {
    this.authService.logout().subscribe(
      (data: any[]) => {
        console.log('LOGOUT');
      }
    );
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
