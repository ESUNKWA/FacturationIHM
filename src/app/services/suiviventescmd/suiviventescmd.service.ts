import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as api from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class SuiviventescmdService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  detailsVentesCmd(idpartenaire, date1, date2, iscmd){
    return this.http.get(`${api.url}/detailsvente/${idpartenaire}/${date1}/${date2}/${iscmd}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  detailsVentesCmdProduits(idpartenaire, idproduits, iscmd, date1, date2){
    return this.http.get(`${api.url}/produitsVendus/${idpartenaire}/${idproduits}/${iscmd}/${date1}/${date2}`, this.httpOptions).pipe(
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
