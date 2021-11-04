import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  apiUrl = 'http://127.0.0.1:8000/api/';

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor( private http: HttpClient ) { }

  fs_saisie_facture(data: any){
    return this.http.post(`${this.apiUrl}facture/register`, JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fs_list_factures(cmd,partenaire,today){
    return this.http.get(`${this.apiUrl}facture/list/${cmd}/${partenaire}/${today}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fs_details_facture(idFacture: any){
    return this.http.get(`${this.apiUrl}facture/detail/${idFacture}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fs_reglementPartiel(idFacture: number, mnt: number, solder: number, idpartenaire){
    return this.http.post(`${this.apiUrl}facture/reglement_partiel/${idFacture}/${mnt}/${solder}/${idpartenaire}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  fs_updateStatusFacture(idFacture: number){
    return this.http.put(`${this.apiUrl}facture/update_status_facture/${idFacture}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
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
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
