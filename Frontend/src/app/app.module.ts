import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule} from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';

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
import { PopUpDialogComponent } from './elements/pop-up-dialog/pop-up-dialog.component';
import { ProjectSiteComponent } from './sites/project-site/project-site.component';
import { UserSettingsComponent } from './sites/user-settings/user-settings.component';
import { WidgetRouterComponent } from './elements/widget-router/widget-router.component';
import { TextWidgetComponent } from './elements/widgets/text-widget/text-widget.component';
import { ImageWidgetComponent } from './elements/widgets/image-widget/image-widget.component';

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
    MenubarComponent,
    PopUpDialogComponent,
    ProjectSiteComponent,
    UserSettingsComponent,
    WidgetRouterComponent,
    TextWidgetComponent,
    ImageWidgetComponent
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
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    FileUploadModule,
    PanelModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  providers: [
    AuthService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
