import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../Component/change-password/change-password.component';
import { DeleteSpaceOrBandComponent } from '../Component/delete-space-or-band/delete-space-or-band.component';
import { DesignOfferProfileComponent } from '../Component/design-offer-profile/design-offer-profile.component';
import { EditProfileComponent } from '../Component/edit-profile/edit-profile.component';
import { IndexationProfileComponent } from '../Component/indexation-profile/indexation-profile.component';
import { MyPhotoComponent } from '../Component/my-photo/my-photo.component';
import { MyProfileComponent } from '../Component/my-profile/my-profile.component';
import { MyVideoComponent } from '../Component/my-video/my-video.component';
import { ProfileComponent } from '../Component/profile/profile.component';
import { UserLayoutComponent } from '../user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'Profile',
        pathMatch: 'full',
      },
      {
        path: 'Profile',
        // component: ProfileComponent,
        component: IndexationProfileComponent,
      },
      {
        path: 'DeleteSpaceOrBand',
        component: DeleteSpaceOrBandComponent,
      },
      {
        path: 'EditProfile',
        component: EditProfileComponent,
        // component: MyProfileComponent,
      }
      ,
      {
        path: 'DOProfile',
        component: DesignOfferProfileComponent,
      }
      ,
      {
        path: 'ChangePassword',
        component: ChangePasswordComponent,
      }
      ,
      {
        path: 'MyPhoto',
        component: MyPhotoComponent,
      }
      ,
      {
        path: 'MyVideo',
        component: MyVideoComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModuleRoutingModule { }
