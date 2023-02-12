import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserLayoutComponent } from '../user-layout.component';
import { MainModuleModule } from '../../main-layout/main-module/main-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserSideBarComponent } from '../Component/user-side-bar/user-side-bar.component';
import { ProfileComponent } from '../Component/profile/profile.component';
import { ShowIndexationComponent } from '../Component/show-indexation/show-indexation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSpinnerOverlayComponent } from 'src/app/Shared/Components/mat-spinner-overlay/mat-spinner-overlay.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IndexationModuleModule } from '../../indexation-layout/indexation-module/indexation-module.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageService } from 'src/app/Shared/Services/message.service';
import { DeleteSpaceOrBandComponent } from '../Component/delete-space-or-band/delete-space-or-band.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditProfileComponent } from '../Component/edit-profile/edit-profile.component';
import { DesignOfferProfileComponent } from '../Component/design-offer-profile/design-offer-profile.component';
import { ShowDesignOfferComponent } from '../Component/show-design-offer/show-design-offer.component';
import { ChangePasswordComponent } from '../Component/change-password/change-password.component';
import { MyPhotoComponent } from '../Component/my-photo/my-photo.component';
import { MyVideoComponent } from '../Component/my-video/my-video.component';
import { IndexationProfileComponent } from '../Component/indexation-profile/indexation-profile.component';
import { MyProfileComponent } from '../Component/my-profile/my-profile.component';
import { HFModuleModule } from '../../hfmodule/hfmodule.module';
import { NewSideBarComponent } from '../Component/new-side-bar/new-side-bar.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    ProfileComponent,
    UserSideBarComponent,
    ShowIndexationComponent,
    DeleteSpaceOrBandComponent,
    EditProfileComponent,
    DesignOfferProfileComponent,
    ShowDesignOfferComponent,
    ChangePasswordComponent,
    MyPhotoComponent,
    MyVideoComponent,
    IndexationProfileComponent,
    MyProfileComponent,
    NewSideBarComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    IndexationModuleModule,
    MainModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HFModuleModule
  ],
  providers: [MessageService],
})
export class UserModuleModule {}
