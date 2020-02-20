import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthGuardUnlogged } from './core/guards/authUnlogged.guard';

const routes: Routes = [
   {
      path: '',
      redirectTo: 'app',
      pathMatch: 'full',
   },
   {
      path: 'app',
      loadChildren: () => import('./modules/ships/ships.module').then((mod) => mod.ShipsModule),
   },
   {
      path: '**',
      redirectTo: 'not-found',
   },
   {
      path: 'not-found',
      loadChildren: () =>
         import('./modules/not-found/not-found.module').then((mod) => mod.NotFoundModule),
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
