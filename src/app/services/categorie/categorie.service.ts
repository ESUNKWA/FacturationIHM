import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  urlApi = 'http://127.0.0.1:8000/api/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //dkem: Observable<any[]>;
  constructor( private http: HttpClient ) { }

  fs_listCategorie(){
    return this.http.get(`${this.urlApi}categories`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
   // return this.dkem;
  }

  fs_saisieCategorie(data){
    return this.http.post(`${this.urlApi}categories`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
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
