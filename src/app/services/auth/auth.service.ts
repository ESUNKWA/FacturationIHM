import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as apiServer from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  //Fonction de connexion
  fct_login(data: any) {
    return this.http.post(apiServer.url + '/auth', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

   handleError(error: { error: { message: string; }; status: any; message: any; }) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
