import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
  }

  submitRegistration() {
    const registrationData = {
      username: this.username.value,
      name: this.name.value,
      password: this.password.value,
      password2: this.password2.value,
      email: this.email.value
    };

    this.authService.register(registrationData).subscribe(
      (response: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.label});
        this.router.navigateByUrl('/login');
      },
      (response: any ) => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: response.error.label});
      }
    );
  }

  get username(): AbstractControl {
    return this.registrationForm.get('username');
  }

  get name(): AbstractControl {
    return this.registrationForm.get('name');
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password');
  }

  get password2(): AbstractControl {
    return this.registrationForm.get('password2');
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }
}
