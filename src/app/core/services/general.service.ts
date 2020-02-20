import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
   providedIn: 'root',
})
export class GeneralService {
   private _message = new Subject<string>();

   constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

   getMessage(): Observable<string> {
      return this._message.asObservable();
   }

   sendMessage(message: string) {
      this._message.next(message);
   }

   clearMessage() {
      this._message.next();
   }

   addIcon(nameIcon: string, fileName: string) {
      console.log(
         this.matIconRegistry.addSvgIcon(
            nameIcon,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/' + fileName),
         ),
      );
   }
}
