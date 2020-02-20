import { Component, OnInit } from '@angular/core';
import { FormElementComponent } from '../form-element/form-element.component';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends FormElementComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
