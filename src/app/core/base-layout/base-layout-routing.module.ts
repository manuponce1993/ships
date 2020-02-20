import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout.component';

const routes: Routes = [
   {
      path: '',
      component: BaseLayoutComponent,
      // Protect all other child routes at one time instead of adding the AuthGuard to each route individually.
      // canActivateChild: [AuthGuard],
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class BaseLayoutRoutingModule {}
