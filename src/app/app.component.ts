import { Component, OnInit } from '@angular/core';
import { GeneralService } from './core/services/general.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   title = 'appwebfinanciadores';

   constructor(private generalService: GeneralService) {}

   ngOnInit() {
      this.addIcons();
   }

   // Add icons gloabally
   addIcons() {
      this.generalService.addIcon('facebook', 'facebook.svg');
      this.generalService.addIcon('twitter', 'twitter.svg');
      this.generalService.addIcon('linkedin', 'linkedin.svg');
      this.generalService.addIcon('whatsapp', 'whatsapp.svg');
   }
}
