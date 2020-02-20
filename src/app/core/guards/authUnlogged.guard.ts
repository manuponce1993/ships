import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanActivateChild,
   CanLoad,
   Route,
   Router,
   RouterStateSnapshot,
} from '@angular/router';
import { ROUTES } from '../enums/routes';

@Injectable({
   providedIn: 'root',
})
export class AuthGuardUnlogged implements CanActivate, CanActivateChild, CanLoad {
   constructor(private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkUnlogged(state.url);
   }

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
   }

   canLoad(route: Route): boolean {
      const url: string = route.path;
      return this.checkUnlogged(url);
   }

   checkUnlogged(url: string): boolean {
      return false;
   }
}
