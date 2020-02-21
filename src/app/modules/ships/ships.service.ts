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

   getPuertos(): Observable<any> {
      const queryParams = new HttpParams()
         .append('startkey', '"puerto"')
         .append('endkey', '"puerto\ufff0"')
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

   getPescados(): Observable<any> {
      const queryParams = new HttpParams()
         .append('startkey', '"pez"')
         .append('endkey', '"pez\ufff0"')
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

   mayor_pesca(pescadoId): Observable<any> {
      const queryParams = new HttpParams()
         .append('group', 'true')
         .append('key', `"${pescadoId.toString()}"`);
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/top_empresa_pescado`, {
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

   barcosLatitud(): Observable<any> {
    const queryParams = new HttpParams().append('group', 'true');

    return this.http
       .get<any>(`${environment.api}/_design/mydesign_test/_view/cruce_latitud`, {
          headers: this.queryHeaders,
          observe: 'response',
          params: queryParams
       })
       .pipe<any>(
          map<HttpResponse<any>, any>((response) => {
            console.log(response.body.rows)
             return response.body.rows;
          }),
       );
   }

   getBenches(): Observable<any> {
    const queryParams = new HttpParams()
       .append('startkey', '"bancodepesca"')
       .append('endkey', '"bancodepesca\ufff0"')
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

   getRoutes(): Observable<any> {
    const queryParams = new HttpParams()
       .append('group_level', '2')
    return this.http
       .get<any>(`${environment.api}/_design/mydesign_test/_view/rutas_por_derrotero`, {
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

   routeCrosses(route): Observable<any> {
    const queryParams = new HttpParams()
       .append('g', 'linestring(' + route.toString() + ')')
       .append('relation', 'crosses')
       .append('limit', '100')
       .append('nearest', 'true');
    return this.http
       .get<any>(`${environment.api}/_design/geodd/_geo/geoidx`, {
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

   desviacion_derrotero(min?, max?): Observable<any> {
      let queryParams = new HttpParams();
      min ? (queryParams = queryParams.append('startkey', min)) : null;
      max ? (queryParams = queryParams.append('endkey', max)) : null;
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/desviacion_derrotero`, {
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

   ultima_posicion_barcos(): Observable<any> {
      let queryParams = new HttpParams().append('group', 'true');
      return this.http
         .get<any>(`${environment.api}/_design/mydesign_test/_view/ultima_posicion_barco`, {
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

   elementos_sin_colision(lon, lat): Observable<any> {
      let queryParams = new HttpParams()
         .append('lon', lon)
         .append('lat', lat)
         .append('radius', '10')
         .append('limit', '100')
         .append('relation', 'disjoint')
         .append('nearest', 'true');
      return this.http
         .get<any>(`${environment.api}/_design/geodd/_geo/geoidx`, {
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
}
