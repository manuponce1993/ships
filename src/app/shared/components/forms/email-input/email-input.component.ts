import { Component, OnInit, Input } from '@angular/core';
import { FormElementComponent } from '../form-element/form-element.component';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'app-email-input',
   templateUrl: './email-input.component.html',
   styleUrls: ['./email-input.component.scss'],
})
export class EmailInputComponent extends FormElementComponent {
   @Input() clearable = false;

   constructor() {
      super();
   }
}
