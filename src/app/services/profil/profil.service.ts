import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';
//import * as apiserver from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  apiserver = {
    url: 'http://127.0.0.1:8000/api'
  };

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient) { }

  fs_listProfil(){
    return this.http.get(this.apiserver.url+'/profil', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_saisieProfil(data: any){
    return this.http.post(this.apiserver.url+'/profil', JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  fs_updateProfil(data: any){
    return this.http.put(this.apiserver.url+'/profil/update', JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
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
