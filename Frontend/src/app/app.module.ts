import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './services/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './sites/login/login.component';
import { RegistrationComponent } from './sites/registration/registration.component';
import { IndexComponent } from './sites/index/index.component';
import { AuthService } from './services/auth/auth.service';
import { SuccessComponent } from './sites/emailconfirm/success/success.component';
import { FailedComponent } from './sites/emailconfirm/failed/failed.component';
import { WrongtokenComponent } from './sites/emailconfirm/wrongtoken/wrongtoken.component';
import { PageNotFoundComponent } from './sites/page-not-found/page-not-found.component';
import { MenubarComponent } from './elements/menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    IndexComponent,
    SuccessComponent,
    FailedComponent,
    WrongtokenComponent,
    PageNotFoundComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    BrowserAnimationsModule,
    PasswordModule,
    ButtonModule,
    MenubarModule,
    PanelMenuModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  providers: [
    AuthService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
