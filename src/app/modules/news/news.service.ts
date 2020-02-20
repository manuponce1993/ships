import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { New } from 'src/app/shared/models/new';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class NewsService {
   constructor(private http: HttpClient) {}

   getActiveNews(): Observable<any> {
      return this.http.get('./assets/mocks/news.json').pipe(
         map<any, any>((response) => {
            return response.news.filter((x: New) => !x.deleted);
         }),
      );
   }

   getNews(): Observable<any> {
      return this.http.get('./assets/mocks/news.json').pipe(
         map<any, any>((response) => {
            return response.news;
         }),
      );
   }

   patchNew(idNew, read) {
      return null;
   }
}
