import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import* as apiServer from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor( private http: HttpClient ) { }

  fs_dash(partenaire: number){
    return this.http.get(apiServer.url+'/dashbord/'+partenaire, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );;
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
