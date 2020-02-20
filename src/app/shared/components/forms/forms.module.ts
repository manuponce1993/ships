import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element/form-element.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input/password-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SelectInputComponent } from './select-input/select-input.component';

@NgModule({
   declarations: [
      FormElementComponent,
      EmailInputComponent,
      PasswordInputComponent,
      TextInputComponent,
      TextAreaInputComponent,
      DatePickerComponent,
      SelectInputComponent,
   ],
   imports: [CommonModule, MaterialModule, ReactiveFormsModule],
   exports: [
      FormElementComponent,
      EmailInputComponent,
      PasswordInputComponent,
      TextInputComponent,
      ReactiveFormsModule,
      TextAreaInputComponent,
      DatePickerComponent,
      SelectInputComponent,
   ],
})
export class FormsModule {}
