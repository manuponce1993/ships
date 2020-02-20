import { Component, OnInit, Input } from '@angular/core';
import { FormElementComponent } from '../form-element/form-element.component';

@Component({
   selector: 'app-text-area-input',
   templateUrl: './text-area-input.component.html',
   styleUrls: ['./text-area-input.component.scss'],
})
export class TextAreaInputComponent extends FormElementComponent implements OnInit {
   @Input() maxLength: number;
   @Input() clearable = false;
   @Input() height = 120;
   @Input() resize = false;

   constructor() {
      super();
   }

   ngOnInit() {}
}
