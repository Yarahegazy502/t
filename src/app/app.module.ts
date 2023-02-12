import { UserModuleModule } from './Core/Layouts/user-layout/user-module/user-module.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Core/footer/footer.component';
import { HeaderComponent } from './Core/header/header.component';
import { OptionsComponent } from './Core/options/options.component';
import { SponsersComponent } from './Core/sponsers/sponsers.component';
import { VisionComponent } from './Core/vision/vision.component';
import { MainLayoutComponent } from './Core/Layouts/main-layout/main-layout.component';
import { HomeComponent } from './Core/Layouts/main-layout/Components/home/home.component';
import { IndexationLayoutComponent } from './Core/Layouts/indexation-layout/indexation-layout.component';
import { MainSponsersComponent } from './Core/Layouts/indexation-layout/Component/main-sponsers/main-sponsers.component';
import { RecommendationComponent } from './Core/Layouts/indexation-layout/Component/recommendation/recommendation.component';
import { StepsComponent } from './Core/Layouts/indexation-layout/Component/steps/steps.component';
import { StepOneComponent } from './Core/Layouts/indexation-layout/Component/step-one/step-one.component';
import { StepTwoComponent } from './Core/Layouts/indexation-layout/Component/step-two/step-two.component';
import { StepThreeComponent } from './Core/Layouts/indexation-layout/Component/step-three/step-three.component';
import { StepFourComponent } from './Core/Layouts/indexation-layout/Component/step-four/step-four.component';
import { IndexationModuleModule } from './Core/Layouts/indexation-layout/indexation-module/indexation-module.module';
import { MainModuleModule } from './Core/Layouts/main-layout/main-module/main-module.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteSpaceOrBandComponent } from './Core/Layouts/user-layout/Component/delete-space-or-band/delete-space-or-band.component';
import { MessageComponent } from './Shared/Components/message/message.component';
import { DesignOfferLayoutComponent } from './Core/Layouts/design-offer-layout/design-offer-layout.component';
import { EditProfileComponent } from './Core/Layouts/user-layout/Component/edit-profile/edit-profile.component';
import { DesignOfferProfileComponent } from './Core/Layouts/user-layout/Component/design-offer-profile/design-offer-profile.component';
import { ShowDesignOfferComponent } from './Core/Layouts/user-layout/Component/show-design-offer/show-design-offer.component';
import { ChangePasswordComponent } from './Core/Layouts/user-layout/Component/change-password/change-password.component';
import { MyPhotoComponent } from './Core/Layouts/user-layout/Component/my-photo/my-photo.component';
import { MyVideoComponent } from './Core/Layouts/user-layout/Component/my-video/my-video.component';
import { NewHomeComponent } from './Core/Layouts/main-layout/Components/new-home/new-home.component';
import { IndexationProfileComponent } from './Core/Layouts/user-layout/Component/indexation-profile/indexation-profile.component';
import { MyProfileComponent } from './Core/Layouts/user-layout/Component/my-profile/my-profile.component';
import { NewSideBarComponent } from './Core/Layouts/user-layout/Component/new-side-bar/new-side-bar.component';
import { ThemeComponent } from './Core/Layouts/user-layout/Component/theme/theme.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent, ThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // IndexationModuleModule,
    // MainModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
