import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignOfferModuleRoutingModule } from './design-offer-module-routing.module';
import { MainModuleModule } from '../../main-layout/main-module/main-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from 'src/app/Shared/Components/mat-spinner-overlay/mat-spinner-overlay.component';
import { DOStepOneComponent } from '../Component/dostep-one/dostep-one.component';
import { DesignOfferLayoutComponent } from '../design-offer-layout.component';
import { IndexationModuleModule } from '../../indexation-layout/indexation-module/indexation-module.module';
import { DOStepTwoComponent } from '../Component/dostep-two/dostep-two.component';
import { DOStepThreeComponent } from '../Component/dostep-three/dostep-three.component';
import { SanitizerUrlPipe } from 'src/app/Shared/Pipes/sanitizer-url.pipe';
import { AppModule } from 'src/app/app.module';
import { HFModuleModule } from '../../hfmodule/hfmodule.module';


@NgModule({
  declarations: [
    DesignOfferLayoutComponent,
    // MainSponsersComponent,
    // RecommendationComponent,
    DOStepOneComponent,
    DOStepTwoComponent,
    DOStepThreeComponent,
    SanitizerUrlPipe
  ],
  imports: [
    CommonModule,
    DesignOfferModuleRoutingModule,
    IndexationModuleModule,
    MainModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HFModuleModule
  ]
})
export class DesignOfferModuleModule { }
