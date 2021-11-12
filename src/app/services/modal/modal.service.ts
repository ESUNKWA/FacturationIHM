import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  fs_modal(data: string, mode: string){

    switch (mode) {
      case 'error':
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data,
          footer: 'Plateforme de gestion et de vente'
        })
        break;

        case 'success':
          Swal.fire({
            icon: 'success',
            title: data,
            showConfirmButton: true
          });
          break;

          case 'warning':
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: data,
              footer: 'Plateforme de gestion et de vente'
            })
          break;

      default:
        break;
    }

  }

}
