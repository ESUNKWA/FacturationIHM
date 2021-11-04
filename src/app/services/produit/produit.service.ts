import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  urlApi = 'http://127.0.0.1:8000/api/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  fs_listProduit(idpartenaire){
    return this.http.get(`${this.urlApi}produits/${idpartenaire}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_saisieProduit(data){
    return this.http.post(`${this.urlApi}produits`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_update_produit(data){
    return this.http.put(`${this.urlApi}produit/edit`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_ajout_qte_produit(data: any = {}){
    return this.http.put(`${this.urlApi}produit/ajout_stock`, JSON.stringify(data), this.httpOptions).pipe(
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
