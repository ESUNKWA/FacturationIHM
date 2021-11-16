import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as apiServer from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  //urlApi = 'http://127.0.0.1:8000/api/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //dkem: Observable<any[]>;
  constructor( private http: HttpClient ) { }

  fs_listAllCategorie(){
    return this.http.get(`${apiServer.url}/categories`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  listCategoriePart(idpartenaire){
    return this.http.get(`${apiServer.url}/categories/${idpartenaire}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_saisieCategorie(data){
    return this.http.put(`${apiServer.url}/categories`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  udpdateCategorie(data,idCat){
    return this.http.put(`${apiServer.url}/categories/${idCat}`, JSON.stringify(data), this.httpOptions).pipe(
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
