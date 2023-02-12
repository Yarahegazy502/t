import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { FooterComponent } from 'src/app/Core/footer/footer.component';
import { HeaderComponent } from 'src/app/Core/header/header.component';
import { OptionsComponent } from 'src/app/Core/options/options.component';
import { SponsersComponent } from 'src/app/Core/sponsers/sponsers.component';
import { VisionComponent } from 'src/app/Core/vision/vision.component';
import { MainLayoutComponent } from '../main-layout.component';
import { HomeComponent } from '../Components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NewHomeComponent } from '../Components/new-home/new-home.component';
import { HFModuleModule } from '../../hfmodule/hfmodule.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,    
    OptionsComponent,
    SponsersComponent,
    VisionComponent,
    NewHomeComponent
    // HeaderComponent,
    // FooterComponent,
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    HFModuleModule
  ],
  exports : []
})
export class MainModuleModule { }
