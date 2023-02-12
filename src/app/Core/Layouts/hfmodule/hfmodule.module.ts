import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewHeaderComponent } from './Component/new-header/new-header.component';
import { NewFooterComponent } from './Component/new-footer/new-footer.component';



@NgModule({
  declarations: [
    NewHeaderComponent,
    NewFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewHeaderComponent,
    NewFooterComponent
  ]
})
export class HFModuleModule { }
