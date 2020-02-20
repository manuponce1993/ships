import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-card-login',
   templateUrl: './card-login.component.html',
   styleUrls: ['./card-login.component.scss'],
})
export class CardLoginComponent implements OnInit {
   @Input() title: string;
   @Input() subtitle: string;
   @Input() icon: string;
   @Input() clickElevation: boolean = false;

   isClickOnLogin = false;

   constructor() {}

   ngOnInit() {}

   onClickLogin() {
      this.clickElevation ? (this.isClickOnLogin = true) : null;
   }

   onClickOutsideLogin() {
      this.isClickOnLogin = false;
   }
}
