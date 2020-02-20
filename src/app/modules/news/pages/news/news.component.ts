import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import { New } from 'src/app/shared/models/new';
import { GeneralService } from 'src/app/core/services/general.service';
import { ROUTES } from 'src/app/core/enums/routes';
import { Router } from '@angular/router';

@Component({
   selector: 'app-news',
   templateUrl: './news.component.html',
   styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
   news: New[];
   allNewsShowed: boolean;
   constructor(
      private service: NewsService,
      private generalService: GeneralService,
      private router: Router,
   ) {}

   ngOnInit() {
      this.getActiveNews();
      this.generalService.sendMessage('Novedades');
   }

   onChangeCheckboxRead(idNew, check, event: Event) {
      this.news.find((x) => x.id === idNew).read = check;
   }

   onDeleteNew(idNew) {
      // this.news.splice(
      //    this.news.findIndex((x) => x.id === idNew),
      //    1,
      // );
      this.news.find((x) => x.id === idNew).deleted = true;
   }

   onRecoverNew(idNew) {
      this.news.find((x) => x.id === idNew).deleted = false;
   }

   onClickNew(n: New) {
      this.router.navigate([ROUTES.CASES, { cif: n.cif }]);
   }

   getNews() {
      this.allNewsShowed = true;
      this.service.getNews().subscribe((news) => {
         this.news = news;
      });
   }

   getActiveNews() {
      this.allNewsShowed = false;
      this.service.getActiveNews().subscribe((news) => {
         this.news = news;
      });
   }

   stopPropagation(e: Event) {
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      e.stopPropagation();
   }
}
