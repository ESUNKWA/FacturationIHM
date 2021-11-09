import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { UtilisateursService } from 'src/app/services/utilisateur/utilisateurs.service';
import { DataTable } from "simple-datatables";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {


  modalTitle: string;
  details: any = [];
  modeAppel: any;
  registerBtnEtat: boolean = false;

  utilisateurData = this.fb.group({
    p_profil: [],
    p_partenaire: [],
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_email: [],
    p_login: [],
    password: [],
    password_confirmation: []
  });
  dataProfil: any = [];
  partenaires: any = [];
  userInfos: any = {};
  selectedLevel: any;
  data: any = [];

  dkem:any [];
  dataStatusUpdate: any = {};

  basicModalCloseResult: string = '';

  constructor( private utilisateurServices: UtilisateursService, private fb: FormBuilder,
              private usersProfils: ProfilService, private swalServices: ModalService,
            private partenaireServices: PartenairesService, private infosUtilisateur: UserInfosService,private modalService: NgbModal ) { }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
      this.fct_listUtilisateurs(this.userInfos.r_partenaire);

    this.fct_listProfil();

    this.listPartenaire();

  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  addProfil(){
    this.utilisateurData.reset();
    this.registerBtnEtat = false;
    this.utilisateurData.enable();
    this.modeAppel = 'creation';
    this.modalTitle = 'Saisir un nouvel utilisateur';

  }

  activeDesactiveUser(data, status){

    this.dataStatusUpdate.iduser = data.r_i;
    this.dataStatusUpdate.p_status = status;
   
    this.utilisateurServices.updateStatusUser(this.dataStatusUpdate).subscribe(
      ( res: any = {} ) => {
        this.fct_listUtilisateurs(this.userInfos.r_partenaire);
      }
    )
  }

  selectUsersartenaire(){
    this.fct_listUtilisateurs(parseInt(this.selectedLevel));
  }
  selectProduitPartenaire1(){
    this.utilisateurData.value.p_partenaire = +this.details.r_partenaire;
  }

  action(data, mode){
    this.modeAppel = 'modif';
    this.details = data;

    switch( mode ){
      case 'edit':
        this.registerBtnEtat = false;
        this.modalTitle = `Modification de l'utilisateur [ ${this.details.r_nom} ${this.details.r_prenoms} ]`;
        this.utilisateurData.enable();
        break;

      case 'views':
        this.registerBtnEtat = true;
        this.modalTitle = `Consultation des informations de l'utilisateur [ ${this.details.r_nom} ${this.details.r_prenoms} ]`;
        this.utilisateurData.disable();
        break;

      default:
        return;
    }
  }

  fct_listUtilisateurs(val: number){

    if( this.userInfos.r_profil !== 4 ){
      val = this.userInfos.r_partenaire
    }

    this.utilisateurServices.fs_listUtilisateur(val).subscribe(
      ( res: any = {} ) => {
        this.data = res.result;
      }
    );

  }

  fct_listProfil(){
    this.usersProfils.fs_listProfil().subscribe(
      ( res: any = {} ) => {
        this.dataProfil = res.result;
      }
    )
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      }
    )
  }

  resgister(){

    switch( this.modeAppel ){
      case 'creation':
        //Controlle des champs
        if( this.utilisateurData.value.p_nom === undefined ){
          this.swalServices.fs_modal('Le nom est réquis','warning');
          return;
        }
        console.log(this.selectedLevel, this.userInfos.r_profil)

        if ( this.userInfos.r_profil !== 4){
          this.utilisateurData.value.p_partenaire = this.userInfos.r_partenaire;
        }

        //Envoie vers le serveur api
        this.utilisateurServices.fs_ajoutUtilisateur(this.utilisateurData.value).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              //this.fct_listUtilisateurs(this.selectedLevel || this.userInfos.r_partenaire);
              this.utilisateurData.reset();
              this.swalServices.fs_modal(res.msg, 'success');
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
        console.log(this.details);
        this.utilisateurServices.fs_updateUtilisateur(this.details).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              //this.fct_listUtilisateurs(this.userInfos.r_partenaire);
              this.utilisateurData.reset();
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

}
