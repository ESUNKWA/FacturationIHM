import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  constructor() { }

  fs_informationUtilisateur(){
    return JSON.parse(localStorage.getItem('userInfos'));
  }

}
