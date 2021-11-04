import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';


@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {

data: any[];
////////////
modalTitle: string;
inputFormat: any = "red";

selectedLevel: any;
partenaireData = this.fb.group({
  p_nom: [],
  p_ville: [],
  p_quartier: [],
  p_stua_geo: [],
  p_description: [],
})
details: any = {};
modeAppel: any;
registerBtnEtat: boolean = false;

villes: any = [
  {
      "id":1,
      "nom":"Abidjan"
  },
  {
      "id":2,
      "nom":"Bouaké"
  }
];
  userInfos: any = {};

  constructor( private fb: FormBuilder, private swalServices: ModalService, private partenaireServices: PartenairesService,
    private modalService: NgbModal, private infosUtilisateur: UserInfosService) { }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur()

    this.listPartenaires();
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  listPartenaires(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {}) =>{

        this.data = res.result;

        console.log(this.data)
      },
      (error) => this.swalServices.fs_modal(error,'error')
    )
  }

  addPartenaire(){
    this.registerBtnEtat = false;
    this.partenaireData.reset();
    this.modeAppel = 'creation';
    this.modalTitle = 'Saisir un nouveau partenaire';

    this.partenaireData.enable();
  }
  action(data, mode){
    this.modeAppel = 'modif';
    this.details = data;
    switch( mode ){
      case 'edit':
        this.registerBtnEtat = false;
        this.modalTitle = `Modification des informations du partenaire [ ${this.details.r_nom} ]`;
        this.partenaireData.enable();
        break;

      case 'views':
        this.registerBtnEtat = true;
        this.modalTitle = `Condutation des informations du partenaire [ ${this.details.r_nom} ]`;
        this.partenaireData.disable();
        break;

      default:
        return;
    }
  }



  resgister(){
    //Validation du formulaire
    if( this.partenaireData.value.p_nom == undefined || this.partenaireData.value.p_nom === '' ){
      this.swalServices.fs_modal('Le nom commercial du partenaire est réquis','warning');
      return;
    }
    if( this.selectedLevel == undefined || this.selectedLevel == 0 ){
      this.swalServices.fs_modal('Le ville du partenaire est réquis','warning');
      return;
    }
    if( this.partenaireData.value.p_quartier == undefined || this.partenaireData.value.p_quartier == '' ){
      this.swalServices.fs_modal('Le quartier du partenaire est réquis','warning');
      return;
    }
    if( this.partenaireData.value.p_stua_geo == undefined || this.partenaireData.value.p_stua_geo == ''){
      this.swalServices.fs_modal('Le situation géographique du partenaire est réquis','warning');
      return;
    }

    this.partenaireData.value.p_utilisateur = this.userInfos.r_i;


    switch( this.modeAppel ){
      case 'creation':
        this.partenaireServices.saisiePartenaire(this.partenaireData.value).subscribe(
          (res: any = {})=>{
            if( !res.status || res.status === undefined ){
              for (const key in res) {
                this.swalServices.fs_modal(res[key],"warning");
              }
              return;
            }
            this.swalServices.fs_modal(res.result,"success");
            this.partenaireData.reset();
            this.listPartenaires();
          },
          (error)=>this.swalServices.fs_modal(error,"error")
        )
        break;

      case 'modif':
        this.partenaireServices.updatePartenaire(this.details, this.details.r_i).subscribe(
          (res: any = {})=>{
            if( !res.status || res.status === undefined ){
              for (const key in res) {
                this.swalServices.fs_modal(res[key],"warning");
              }
              return;
            }
            this.swalServices.fs_modal(res.result,"success");
            this.partenaireData.reset();
            this.listPartenaires();
          },
          (error)=>this.swalServices.fs_modal(error,"error")
        )
        break;
    }
  }

}
