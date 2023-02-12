import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { MainModuleModule } from '../../main-layout/main-module/main-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../Component/login/login.component';
import { RegisterComponent } from '../Component/register/register.component';
import { AuthLayoutComponent } from '../auth-layout.component';
import { RegisterSuccessfullyComponent } from '../Component/register-successfully/register-successfully.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from 'src/app/Shared/Components/mat-spinner-overlay/mat-spinner-overlay.component';
import { IndexationModuleModule } from '../../indexation-layout/indexation-module/indexation-module.module';
import { LogoutComponent } from '../Component/logout/logout.component';
import { AppModule } from 'src/app/app.module';
import { HFModuleModule } from '../../hfmodule/hfmodule.module';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessfullyComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    // MainModuleModule,
    IndexationModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HFModuleModule
  ],
})
export class AuthModuleModule {}
