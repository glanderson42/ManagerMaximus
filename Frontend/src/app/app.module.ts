import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './services/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './sites/login/login.component';
import { RegistrationComponent } from './sites/registration/registration.component';
import { SuccessComponent } from './sites/emailconfirm/success/success.component';
import { FailedComponent } from './sites/emailconfirm/failed/failed.component';
import { WrongtokenComponent } from './sites/emailconfirm/wrongtoken/wrongtoken.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SuccessComponent,
    FailedComponent,
    WrongtokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    BrowserAnimationsModule,
    PasswordModule,
    ButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
