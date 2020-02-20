import { Component, OnInit, HostListener } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { NewsService } from 'src/app/modules/news/news.service';
import { New } from 'src/app/shared/models/new';
import { ROUTES } from '../enums/routes';
import { Router } from '@angular/router';

@Component({
   selector: 'app-base-layout',
   templateUrl: './base-layout.component.html',
   styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit {
   routes = ROUTES;
   opened;
   mode;
   subscription: Subscription;
   subscriptionMessage: Subscription;
   message: any;
   watcher: Subscription;
   news: New[];
   activeMediaQuery = '';

   constructor(
      public mediaObserver: MediaObserver,
      private generalService: GeneralService,
      private newsService: NewsService,
      private router: Router,
   ) {
      this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
         this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
         if (change.mqAlias == 'xs' || change.mqAlias == 'sm') {
            this.onMobile();
         } else {
            this.onDesktop();
         }
      });
   }

   ngOnInit() {
      // this.userData = this.authService.currentUserValue;
      this.subscriptionMessage = this.generalService.getMessage().subscribe((message) => {
         this.message = message;
      });
      this.getActiveNews();
   }

   ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
      this.subscriptionMessage ? this.subscriptionMessage.unsubscribe() : null;
   }

   onMobile() {
      this.opened = false;
      this.mode = 'over';
   }

   onDesktop() {
      this.opened = true;
      this.mode = 'side';
   }

   getActiveNews() {
      this.newsService.getActiveNews().subscribe((news) => (this.news = news));
   }

   onClickNew(n: New) {
      this.router.navigate([ROUTES.CASES, { cif: n.cif }]);
   }
}
