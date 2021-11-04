import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
//Datatable variables
public rowsOnPage = 5;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
data: any[];
modalTitle: string
detailsProduit: any = {};
  selectedOption = '3';
produitData = this.fb.group({
  p_partenaire: [],
  p_categorie: [],
  r_libelle: [],
  p_stock: [],
  p_prix_vente: [],
  p_description: [],
});
  selectOptionService: any;
  public items:Array<string> = ['Alabama', 'Wyoming', 'Henry Die', 'John Doe'];
  article: any = {};
  @ViewChild('newQteProduit') newQteProduit;
  newStock: number;
  augmentationStock: any = {};
  registerBtnEtat: boolean = false;
  modeAppel: string;
  userInfos: any = {};
  partenaires: any = [];
  categories: any = [];
  selectedLevel: any;
  hideLoder: boolean = true;

  constructor( private fb: FormBuilder, private produitServices: ProduitService,
                private swalServices: ModalService, private infosUtilisateur: UserInfosService,
                private partenaireServices: PartenairesService, private categorieServices: CategorieService ) { }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.list_produits(this.userInfos.r_partenaire);
    this.listPartenaire();
    this.listCategories();
  }

  selectProduitPartenaire(){
    this.list_produits(parseInt(this.selectedLevel));
  }

  list_produits(val){

    if( this.userInfos.r_profil !== 4 ){
      val = this.userInfos.r_partenaire;
    }
    this.produitServices.fs_listProduit(val).subscribe(
      (res: any = {}) => {
        this.data = res.result;
        setTimeout(() => {
          this.hideLoder = false
        }, 2000);
      },
      (err) => this.swalServices.fs_modal(err, 'error')
    );
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      }
    )
  }
  listCategories(){
    this.categorieServices.fs_listCategorie().subscribe(
      (res: any = {})=>{
        this.categories = res.result;
      }
    )
  }

  fc_add_produit(){
    this.produitData.reset();
    this.produitData.enable();
    this.modeAppel = 'creation';
    this.modalTitle = 'Saisir une nouveau produit';
    this.registerBtnEtat = false;
  }
  fc_details_produit(data: any = {}, mode){
    this.modalTitle = `Modification de la catégorie [ ${data.r_libelle} ]`;
    this.detailsProduit = data;
    switch( mode ){
      case 1://Modification
        this.produitData.enable();
        this.registerBtnEtat = false;
        this.modeAppel = 'modif';
        break;

      case 2://Consultation
        this.produitData.disable();
        this.registerBtnEtat = true;
        break;

      default:
        break;
    }
  }

  registerProduit(){
    // Control des champs
    if( this.userInfos.r_profil == 4 && this.produitData.value.p_partenaire == null){
      this.swalServices.fs_modal('Sélectionnez le partenaire', 'warning');
      return;
    }

    if( this.produitData.value.r_libelle === '' || ! this.produitData.value.r_libelle ){
      this.swalServices.fs_modal('Le libellé du produit est réquis', 'warning');
      return;
    }
    if( this.produitData.value.p_stock === '' || ! this.produitData.value.p_stock ){
      this.swalServices.fs_modal('Le stock du produit est réquis', 'warning');
      return;
    }
    if( this.produitData.value.p_prix_vente === '' || ! this.produitData.value.p_prix_vente ){
      this.swalServices.fs_modal('Le prix de vente est réquis', 'warning');
      return;
    }
    //Envoie vers le serveur api
    if( this.userInfos.r_profil !== 4 ){
      this.produitData.value.p_partenaire = this.userInfos.r_partenaire;
    }

    switch( this.modeAppel ){
      case 'creation':
          this.produitServices.fs_saisieProduit(this.produitData.value).subscribe(
            (res: any = {}) =>{
              if( res.status === 1){
                this.list_produits(this.userInfos.r_partenaire);
                this.produitData.reset();
                this.swalServices.fs_modal(res.result, 'success');
              }else{
                this.swalServices.fs_modal(res.result, 'error');
              }

            },
            (error) =>{
              this.swalServices.fs_modal(error, 'error');
            }
          )
      break;

      case 'modif':

              //Envoie vers le serveur api
              this.produitData.value.p_idproduit = this.detailsProduit.r_i;
              this.produitServices.fs_update_produit(this.produitData.value).subscribe(
                (res: any = {}) =>{
                  if( res.status === 1){
                    this.list_produits(this.userInfos.r_partenaire);
                    this.produitData.reset();
                    this.swalServices.fs_modal(res.result, 'success');
                  }else{
                    this.swalServices.fs_modal(res.result, 'error');
                  }

                },
                (error) =>{
                  this.swalServices.fs_modal(error, 'error');
                }
              )

        break;
    }


  }
  //Validation du formulaire


  saisirNewQteproduit(){
    this.newStock = this.article.r_stock + +this.newQteProduit.nativeElement.value;
  }

  addNewQteProduit(){
    this.augmentationStock.p_idproduit = this.article.r_i,
    this.augmentationStock.p_quantite = this.newStock,
    this.produitServices.fs_ajout_qte_produit(this.augmentationStock).subscribe(
      (res: any = {}) => {
        if( res.status === 1 ){
          this.swalServices.fs_modal(res.result,'success');
          this.newQteProduit.nativeElement.value = '';
          this.newStock = 0;
          this.list_produits(this.userInfos.r_partenaire);
        }else{

        }
      },
      (err) => console.log(err)
    )
  }

  openMyModal(event, article: any = {}) {
    this.article = article;
    document.querySelector('#' + event).classList.add('md-show');

  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
