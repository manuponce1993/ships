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
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
   constructor(private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLogin(state.url);
   }

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
   }

   canLoad(route: Route): boolean {
      const url: string = route.path;
      return this.checkLogin(url);
   }

   checkLogin(url: string): boolean {
      return false;
   }
}
