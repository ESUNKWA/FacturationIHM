import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import* as api from'../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class PartenairesService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  listPartenaires(){
    return this.http.get(api.url+'/partenaires', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  saisiePartenaire(data){
    return this.http.post(api.url+'/partenaires', JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updatePartenaire(data, idpartenaire){
    return this.http.put(api.url+'/partenaires/'+idpartenaire, JSON.stringify(data), this.httpOptions).pipe(
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
