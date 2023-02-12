import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { StepOneComponent } from '../step-one/step-one.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor(private global : GlobalService,
              private route : Router,
              private stepone : StepOneComponent) { 
  }

  ngOnInit(): void {
  }

  // goToNextSteps()
  // {
  //   console.log(this.global.StepNumber);   

  //   if(this.global.StepNumber == 1)
  //   {
  //     console.log(this.stepone.getFirstStepData());

  //     console.log('Go To Step 2');
  //     this.route.navigate(['/Indexation/StepTwo']);
  //   }
  //   else if(this.global.StepNumber == 2)
  //   {
  //     console.log('Go To Step 3');
  //     this.route.navigate(['/Indexation/StepThree']);
  //   }
  //   else if(this.global.StepNumber == 3)
  //   {
  //     console.log('Go To Step 4');
  //     this.route.navigate(['/Indexation/StepFour']);
  //   }
  //   else if(this.global.StepNumber == 4)
  //   {
  //     console.log('Finished');
  //   }

  // }

}
