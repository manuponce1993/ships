import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Google Maps
import { AgmCoreModule } from '@agm/core';

// Note we need a separate function as it's required
// by the AOT compiler

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      MaterialModule,
      AgmCoreModule.forRoot({
         apiKey: 'YOUR GOOGLE MAPS API KEY',
         /* apiKey is required, unless you are a 
         premium customer, in which case you can 
         use clientId 
         */
      }),
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
