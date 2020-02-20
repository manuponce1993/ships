import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/enums/routes';

@Component({
   selector: 'app-side-nav',
   templateUrl: './side-nav.component.html',
   styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
   routes = ROUTES;
   user: User;
   sideIconColor = 'primary';

   constructor(private router: Router) {}

   ngOnInit() {}

   ngOnDestroy() {}
}
