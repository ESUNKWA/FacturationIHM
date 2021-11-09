import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { url } from '../../module/urlserver';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  //Fonction de récupération des utilisa{teurs
  fs_listUtilisateur(ippartenaire: number){
    return this.http.get(url+'/utilisateurs/'+ippartenaire);
  }

  //Ajout nouvel utilisateur
  fs_ajoutUtilisateur(datas: any){
    return this.http.post( url+'/utilisateurs',  JSON.stringify(datas), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  fs_updateUtilisateur(data: any){
    return this.http.put(url+'/utilisateurs/update', JSON.stringify(data), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateStatusUser(data){
    return this.http.put(url+'/utilisateur.activdesact', JSON.stringify(data), this.httpOptions).pipe(
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
