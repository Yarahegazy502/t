import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../auth-layout.component';
import { LoginComponent } from '../Component/login/login.component';
import { LogoutComponent } from '../Component/logout/logout.component';
import { RegisterSuccessfullyComponent } from '../Component/register-successfully/register-successfully.component';
import { RegisterComponent } from '../Component/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full',
      },
      {
        path: 'Login',
        component: LoginComponent,
      },
      {
        path: 'Register',
        component: RegisterComponent,
      },
      {
        path: 'RegisterSuccessfully',
        component: RegisterSuccessfullyComponent,
      },
      {
        path: 'Logout',
        component: LogoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModuleRoutingModule {}
