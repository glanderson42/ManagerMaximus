import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../sites/login/login.component';
import { RegistrationComponent } from '../../sites/registration/registration.component';
import { SuccessComponent } from '../../sites/emailconfirm/success/success.component';
import { FailedComponent } from '../../sites/emailconfirm/failed/failed.component';
import { WrongtokenComponent } from '../../sites/emailconfirm/wrongtoken/wrongtoken.component'
import { IndexComponent } from '../../sites/index/index.component';
import { PageNotFoundComponent } from '../../sites/page-not-found/page-not-found.component';
import { ProjectSiteComponent } from '../../sites/project-site/project-site.component';
import { UserSettingsComponent } from 'src/app/sites/user-settings/user-settings.component';

const routes: Routes = [ {path: 'login', component: LoginComponent },
                         {path: 'registration', component: RegistrationComponent },
                         {path: 'emailconfirm/success', component: SuccessComponent },
                         {path: 'emailconfirm/error', component: FailedComponent },
                         {path: 'emailconfirm/wrongtoken', component: WrongtokenComponent },
                         {path: 'project/:id', component: ProjectSiteComponent },
                         {path: 'user', component: UserSettingsComponent },
                         {path: '', component: IndexComponent },
                         {path: '**', component: PageNotFoundComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
