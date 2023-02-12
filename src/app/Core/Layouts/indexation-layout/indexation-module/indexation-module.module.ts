import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexationModuleRoutingModule } from './indexation-module-routing.module';
import { IndexationLayoutComponent } from '../indexation-layout.component';
import { MainSponsersComponent } from '../Component/main-sponsers/main-sponsers.component';
import { RecommendationComponent } from '../Component/recommendation/recommendation.component';
import { StepsComponent } from '../Component/steps/steps.component';
import { StepOneComponent } from '../Component/step-one/step-one.component';
import { StepTwoComponent } from '../Component/step-two/step-two.component';
import { StepThreeComponent } from '../Component/step-three/step-three.component';
import { StepFourComponent } from '../Component/step-four/step-four.component';
import { MainModuleModule } from '../../main-layout/main-module/main-module.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from 'src/app/Shared/Components/mat-spinner-overlay/mat-spinner-overlay.component';
import { HomeComponent } from '../../main-layout/Components/home/home.component';
import { FooterComponent } from 'src/app/Core/footer/footer.component';
import { AppModule } from 'src/app/app.module';
import { HFModuleModule } from '../../hfmodule/hfmodule.module';

@NgModule({
  declarations: [
    IndexationLayoutComponent,
    MainSponsersComponent,
    RecommendationComponent,
    StepsComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    MatSpinnerOverlayComponent
    ],
  imports: [
    CommonModule,
    IndexationModuleRoutingModule,
    MainModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HFModuleModule
  ],
  exports: [
    MatSpinnerOverlayComponent,
    MainSponsersComponent,
    RecommendationComponent
  ],
  providers: [StepOneComponent],
})
export class IndexationModuleModule { }
