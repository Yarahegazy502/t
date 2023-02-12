import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { NewHomeComponent } from '../Components/new-home/new-home.component';
import { MainLayoutComponent } from '../main-layout.component';

const routes: Routes = [
  {
    path : '',
    component : MainLayoutComponent,
    children : [
      {
        path : '',
        redirectTo : 'Home',
        pathMatch : 'full'
      },
      {
        path : 'Home',
        // component : NewHomeComponent
        component : HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
