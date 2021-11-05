import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProfilService } from 'src/app/services/profil/profil.service';

@Component({
  selector: 'app-profil-utilisateurs',
  templateUrl: './profil-utilisateurs.component.html',
  styleUrls: ['./profil-utilisateurs.component.scss']
})
export class ProfilUtilisateursComponent implements OnInit {

  data: any[];
  ////////////
  modalTitle: string;

  profilUtilisateurData = this.fb.group({
    r_libelle: [],
    p_description: []
  })
  details: any = {};
  modeAppel: any;
  registerBtnEtat: boolean = false;



  constructor( private usersProfils: ProfilService, private fb: FormBuilder, private swalServices: ModalService,
    private modalService: NgbModal ) { }

  ngOnInit() {
    this.fct_listProfil();
  }

  addProfil(){
    this.registerBtnEtat = false;
    this.modeAppel = 'creation';
    this.modalTitle = 'Saisir un nouveau profil';
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  action(data, mode){
    this.modeAppel = 'modif';
    this.details = data;
    switch( mode ){
      case 'edit':
        this.registerBtnEtat = false;
        this.modalTitle = `Modification du profil [ ${this.details.r_libelle} ]`;
        this.profilUtilisateurData.enable();
        break;

      case 'views':
        this.registerBtnEtat = true;
        this.modalTitle = `Consultation du profil [ ${this.details.r_libelle} ]`;
        this.profilUtilisateurData.disable();
        break;

      default:
        return;
    }
  }

  resgister(){

    switch( this.modeAppel ){
      case 'creation':
        //Controlle des champs
        if( this.profilUtilisateurData.value.r_libelle === '' ){
          this.swalServices.fs_modal('Le libellé est réquis','warning');
          return;
        }

        //Envoie vers le serveur api
        this.usersProfils.fs_saisieProfil(this.profilUtilisateurData.value).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              this.fct_listProfil();
              this.profilUtilisateurData.reset();
              this.swalServices.fs_modal(res.result, 'success');
            }else{
              this.swalServices.fs_modal(res.r_libelle, 'error');
            }

          },
          (error) =>{
            this.swalServices.fs_modal(error, 'error');
          }
        );
        break;

      case 'modif':
        //Envoie vers le serveur api
        this.usersProfils.fs_updateProfil(this.details).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              this.fct_listProfil();
              this.profilUtilisateurData.reset();
              this.swalServices.fs_modal(res.result, 'success');
            }else{
              this.swalServices.fs_modal(res.r_libelle, 'error');
            }

          },
          (error) =>{
            this.swalServices.fs_modal(error, 'error');
          }
        );
        break;

      default:
      return;
    }

  }

  fct_listProfil(){
    this.usersProfils.fs_listProfil().subscribe(
      ( res: any = {} ) => {
        this.data = res.result;
      }
    )
  }





  /* ----------------------------------Datatable------------------------ */



}
