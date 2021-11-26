
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';


/* ----------------------- */

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  ////////////
  dataRetour: any = {};
  data: any = [];

  modalTitle: string;

  detailsCategories: any = {};

  categorieData = this.fb.group({
    r_libelle: ['', Validators.required],
    p_description: []
  });

  registerBtnStatus: boolean = true;
  modeAppel: string;
  details: any;
  chargementEncours: boolean;
  userInfos: any = {};
  selectedLevel: number;
  partenaires: any = [];

  constructor( private categorieServices: CategorieService, private http: HttpClient,
                private fb: FormBuilder, private swalServices: ModalService,  private modalService: NgbModal,
                private infosUtilisateur: UserInfosService, private partenaireServices: PartenairesService) {

                }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.list_categorie();
    this.listPartenaire();

  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  listPartenaire(){

    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;

      }
    )
  }

  list_categorie(){

    this.chargementEncours = true;
    const idpart = ( this.userInfos.r_profil == 4 )? this.selectedLevel : this.userInfos.r_partenaire;
    this.categorieServices.listCategoriePart(idpart).subscribe(
      (res) => {
        this.dataRetour = res,
        this.data = this.dataRetour.result;

        setTimeout(() => {
          this.chargementEncours = false;
        }, 2000);
      },
      (err) => console.log(err),
    );
  }

  fc_add_categorie(): void {
    this.categorieData.reset();
    this.categorieData.enable();
    this.modalTitle = 'Saisir une nouvelle catégorie';
    this.registerBtnStatus = false;
  }

  fc_details_categorie(data: any = {}, mode){
    this.modalTitle = `Modification de la catégorie [ ${data.r_libelle} ]`;
    this.detailsCategories = data;
    switch( mode ){
      case 1://Modification
        this.modeAppel = 'modif';
        this.categorieData.enable();
        this.registerBtnStatus = true;
        break;

      case 2://Consultation
        this.modeAppel = 'consult';
        this.categorieData.disable();
        this.registerBtnStatus = false;
        break;

      default:
        break;
    }


  }

  addCategorie(){
    this.modalTitle = 'Saisie une nouvelle catégorie de produit';
    this.modeAppel = 'creation';
  }

  resgister(){
    //Controlle des champs
    if( this.categorieData.value.r_libelle === '' ){
      this.swalServices.fs_modal('Le libellé est réquis','warning');
      return;
    }


    switch (this.modeAppel) {

      case 'creation':
        console.log(this.userInfos.r_i, this.userInfos);

        //Envoie vers le serveur api
        const idpart = ( this.userInfos.r_profil == 4 )? this.selectedLevel : this.userInfos.r_partenaire;
        this.categorieData.value.p_utilisateur = this.userInfos.r_i;
        this.categorieData.value.p_partenaire = idpart;
        this.categorieServices.fs_saisieCategorie(this.categorieData.value).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              this.list_categorie();
              this.categorieData.reset();
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
        const idparten = ( this.userInfos.r_profil == 4 )? this.selectedLevel : this.userInfos.r_partenaire;
        //this.detailsCategories.p_utilisateur = this.userInfos.r_i;
        //this.detailsCategories.p_partenaire = idparten;

        console.log(this.detailsCategories);



        this.categorieServices.udpdateCategorie(this.detailsCategories, this.detailsCategories.r_i).subscribe(
          (res: any = {}) =>{
            if( res.status === 1){
              this.list_categorie();
              this.categorieData.reset();
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
        break;
    }

  }



  /* --------------------------------------------------------------------------------- */

}
