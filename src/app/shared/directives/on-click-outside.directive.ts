import { Directive, ElementRef, Output, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
   selector: '[appOnClickOutside]',
})
export class OnClickOutsideDirective {
   constructor(private _elementRef: ElementRef) {}

   @Output()
   public clickOutside = new EventEmitter();

   @HostListener('document:click', ['$event.target'])
   public onClick(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
         this.clickOutside.emit(null);
      }
   }
}
