import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepFourComponent } from '../Component/step-four/step-four.component';
import { StepOneComponent } from '../Component/step-one/step-one.component';
import { StepThreeComponent } from '../Component/step-three/step-three.component';
import { StepTwoComponent } from '../Component/step-two/step-two.component';
import { IndexationLayoutComponent } from '../indexation-layout.component';

const routes: Routes = [
  {
    path : '',
    component : IndexationLayoutComponent,
    children : [
      {
        path : '',
        redirectTo : 'StepOne'
      },
      {
        path : 'StepOne',
        component : StepOneComponent
      },
      {
        path : 'StepTwo',
        component : StepTwoComponent
      },
      {
        path : 'StepThree',
        component : StepThreeComponent
      },
      {
        path : 'StepFour',
        component : StepFourComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexationModuleRoutingModule { }
