import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ModalService } from 'src/app/services/modal/modal.service';
//import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  ////////////
  dataRetour: any = {};
  data: any[];

  modalTitle: string;

  detailsCategories: any = {};

  categorieData = this.fb.group({
    r_libelle: ['', Validators.required],
    p_description: []
  });

  registerBtnStatus: boolean = true;
  modeAppel: string;
  details: any;

  constructor( private categorieServices: CategorieService, private http: HttpClient,
                private fb: FormBuilder, private swalServices: ModalService,  private modalService: NgbModal ) {

                }

  ngOnInit() {

    this.list_categorie();
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  list_categorie(){
    this.categorieServices.fs_listCategorie().subscribe(
      (res) => {
        this.dataRetour = res,
        this.data = this.dataRetour.result;

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
        this.categorieData.enable();
        this.registerBtnStatus = true;
        break;

      case 2://Consultation
        this.categorieData.disable();
        this.registerBtnStatus = false;
        break;

      default:
        break;
    }


  }


  resgister(){
    //Controlle des champs
    if( this.categorieData.value.r_libelle === '' ){
      this.swalServices.fs_modal('Le libellé est réquis','warning');
      return;
    }

    //Envoie vers le serveur api
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


  }


}
