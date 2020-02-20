import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class ShipsService {
   username = '3d25627f-063c-4652-b6f5-ee7e3ce56acf-bluemix';
   password = 'cf24a7d32d2dc33aee8632cf6b99af87873d8317afb557c348c518cef8455e0a';
   queryHeaders = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
      .append('Content-Type', 'application/json');
   constructor(private http: HttpClient) {}

   barcos_por_puerto(puertoId): Observable<any> {
      const queryParams = new HttpParams()
         .append('group', 'true')
         .append('key', `"${puertoId.toString()}"`);
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/barcos_por_puerto`, {
            headers: this.queryHeaders,
            observe: 'response',
            params: queryParams,
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body.rows;
            }),
         );
   }

   getBarcos(): Observable<any> {
      const queryParams = new HttpParams()
         .append('startkey', '"barco"')
         .append('endkey', '"barco\ufff0"')
         .append('include_docs', 'true');
      return this.http
         .get<any>(`${environment.api}/_all_docs`, {
            headers: this.queryHeaders,
            observe: 'response',
            params: queryParams,
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body.rows;
            }),
         );
   }

   ultimo_consumo(): Observable<any> {
      const queryParams = new HttpParams().append('group', 'true');
      // .append('key', `"${puertoId.toString()}"`);
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/consumo_combustible`, {
            headers: this.queryHeaders,
            observe: 'response',
            params: queryParams,
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body.rows;
            }),
         );
   }

   salteo_derrotero(): Observable<any> {
      // const queryParams = new HttpParams().append('group', 'true');
      // .append('key', `"${puertoId.toString()}"`);
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/alerta_salto_derrotero`, {
            headers: this.queryHeaders,
            observe: 'response',
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body.rows;
            }),
         );
   }
}
