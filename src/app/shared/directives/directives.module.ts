import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnClickOutsideDirective } from './on-click-outside.directive';

@NgModule({
   declarations: [OnClickOutsideDirective],
   imports: [CommonModule],
   exports: [OnClickOutsideDirective],
})
export class DirectivesModule {}
