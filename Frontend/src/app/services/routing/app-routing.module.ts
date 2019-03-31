import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../sites/login/login.component';
import { RegistrationComponent } from '../../sites/registration/registration.component';
import { IndexComponent } from '../../sites/index/index.component';


const routes: Routes = [ {path: 'login', component: LoginComponent },
                         {path: 'registration', component: RegistrationComponent },
                         {path: 'index', component: IndexComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
