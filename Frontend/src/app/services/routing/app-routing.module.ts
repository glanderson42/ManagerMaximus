import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../sites/login/login.component';
import { RegistrationComponent } from '../../sites/registration/registration.component';
import { SuccessComponent } from '../../sites/emailconfirm/success/success.component';
import { FailedComponent } from '../../sites/emailconfirm/failed/failed.component';
import { WrongtokenComponent } from '../../sites/emailconfirm/wrongtoken/wrongtoken.component'

const routes: Routes = [ {path: 'login', component: LoginComponent },
                         {path: 'registration', component: RegistrationComponent },
                         {path: 'emailconfirm/success', component: SuccessComponent },
                         {path: 'emailconfirm/failed', component: FailedComponent },
                         {path: 'emailconfirm/wrongtoken', component: WrongtokenComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
