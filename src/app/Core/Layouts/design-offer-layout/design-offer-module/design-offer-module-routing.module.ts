import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DOStepOneComponent } from '../Component/dostep-one/dostep-one.component';
import { DOStepThreeComponent } from '../Component/dostep-three/dostep-three.component';
import { DOStepTwoComponent } from '../Component/dostep-two/dostep-two.component';
import { DesignOfferLayoutComponent } from '../design-offer-layout.component';

const routes: Routes = [
  {
    path : '',
    component : DesignOfferLayoutComponent,
    children : [
      {
        path : '',
        redirectTo : 'DOStepOne'
      },
      {
        path : 'DOStepOne',
        component : DOStepOneComponent
      },
      {
        path : 'DOStepTwo',
        component : DOStepTwoComponent
      },
      {
        path : 'DOStepThree',
        component : DOStepThreeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignOfferModuleRoutingModule { }
