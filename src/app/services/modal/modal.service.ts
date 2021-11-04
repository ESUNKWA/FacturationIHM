import { Injectable } from '@angular/core';
//import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  fs_modal(data: string, mode: string){

   /*  switch (mode) {
      case 'error':
        swal({
          title: 'Erreur !',
          text: data,
          type: mode,
          confirmButtonText: 'Fermer',
          allowOutsideClick: true
        }).catch(swal.noop);
        break;

        case 'success':
          swal({
            title: 'Excellent !',
            text: data,
            type: mode,
            confirmButtonText: 'Fermer',
          }).catch(swal.noop);
          break;

          case 'warning':
            swal({
              title: 'Avertissement !',
              text: data,
              type: mode,
              confirmButtonText: 'Fermer',
              allowOutsideClick: true
            }).catch(swal.noop);
          break;

      default:
        break;
    }
 */
  }

}
