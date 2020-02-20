import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'app-form-element',
   templateUrl: './form-element.component.html',
   styleUrls: ['./form-element.component.scss'],
})
export class FormElementComponent implements OnInit {
   @Input() form: FormGroup;
   @Input() name: string;
   @Input() label: string;
   @Input() icon: string;
   @Input() hint: string;
   @Input() placeholder: string; // Undefined by default
   @Input() readonly: boolean; // Undefined by default
   @Input() disabled: boolean; // Undefined by default
   @Input() errorMatcher;

   objectValues = Object.values;

   constructor() {}

   ngOnInit() {}
}
