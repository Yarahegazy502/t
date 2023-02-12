import { AppComponent } from './app.component';
import { core } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Main',
    pathMatch: 'full',
  },
  {
    path: 'Main',
    loadChildren: () =>
      import('./Core/Layouts/main-layout/main-module/main-module.module').then(
        (m) => m.MainModuleModule
      ),
  },
  {
    path: 'Indexation',
    loadChildren: () =>
      import(
        './Core/Layouts/indexation-layout/indexation-module/indexation-module.module'
      ).then((m) => m.IndexationModuleModule),
  },
  {
    path: 'DesignOffer',
    loadChildren: () =>
      import(
        './Core/Layouts/design-offer-layout/design-offer-module/design-offer-module.module'
      ).then((m) => m.DesignOfferModuleModule),
  },

  {
    path: 'User',
    loadChildren: () =>
      import('./Core/Layouts/user-layout/user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
