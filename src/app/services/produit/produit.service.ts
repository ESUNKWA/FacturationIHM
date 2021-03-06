import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as apiServer from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  fs_listProduit(idpartenaire){
    return this.http.get(`${apiServer.url}/produits/${idpartenaire}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_saisieProduit(data){
    return this.http.post(`${apiServer.url}/produits`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_update_produit(data){
    return this.http.put(`${apiServer.url}/produit/edit`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_ajout_qte_produit(data: any = {}){
    return this.http.put(`${apiServer.url}/produit/ajout_stock`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  consult_achat_produit(idpartenaire, date1, date2){
    return this.http.get(`${apiServer.url}/viewsachats/${idpartenaire}/${date1}/${date2}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  consult_achat_produit_rgpmt(idpartenaire, date1, date2){
    return this.http.get(`${apiServer.url}/viewsachatsrgpmt/${idpartenaire}/${date1}/${date2}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  consult_achat_par_produit(idpartenaire,idproduit, date1, date2){
    return this.http.get(`${apiServer.url}/viewsachatsparproduit/${idpartenaire}/${idproduit}/${date1}/${date2}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  alertStock(idpartenaire){
    return this.http.get(`${apiServer.url}/produit.alerte/${idpartenaire}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addstock(data){
    return this.http.post(`${apiServer.url}/stock`, JSON.stringify(data), this.httpOptions).pipe(
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
