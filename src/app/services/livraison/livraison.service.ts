import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as server from '../../module/urlserver';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  listLivraisons(idpartenaire,date1, date2){
    return this.http.get(server.url+'/livraisons/'+idpartenaire+'/'+date1+'/'+date2, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  detailsLivraisons(idvente, date1, date2){
    return this.http.get(server.url+'/livraisons/details/'+idvente+'/'+date1+'/'+date2, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateLivraisons(idlivraison, status){
    return this.http.put(server.url+'/livraisons/updatestatus/' + idlivraison + '/'+ status , this.httpOptions).pipe(
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
