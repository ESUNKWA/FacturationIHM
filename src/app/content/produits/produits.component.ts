import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import Swal from 'sweetalert2';
import * as api from '../../module/urlserver';

/* Importation du module PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExportfilesService } from 'src/app/services/exportfiles/exportfiles.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
dataRetour: any ;
data: any[];
modalTitle: string
detailsProduit: any = {};
produitData = this.fb.group({
  p_partenaire: [],
  p_categorie: [],
  r_libelle: [],
  p_stock: [],
  p_prix_vente: [],
  p_description: [],
});

updatestockData: any = {};

  article: any = {};
  @ViewChild('newQteProduit') newQteProduit;
  newStock: number;
  augmentationStock: any = {};
  registerBtnStatus: boolean = true;
  modeAppel: string;
  userInfos: any = {};
  partenaires: any = [];
  categories: any = [];
  selectedLevel: any;
  details: any = {};
  chargementEncours: boolean;
  desacStock: boolean = false;
  tableBody: any = [];
  qteAchat: any;
  mntAchat: any;
  r_libelle: any;
  data2: any[];

  constructor( private fb: FormBuilder, private produitServices: ProduitService,
                private swalServices: ModalService, private infosUtilisateur: UserInfosService,
                private partenaireServices: PartenairesService, private categorieServices: CategorieService, 
                private modalService: NgbModal, private exportpdf: ExportfilesService ) {
                  pdfMake.vfs = pdfFonts.pdfMake.vfs;
                 }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.list_produits(this.userInfos.r_partenaire);
    this.listPartenaire();
    this.listCategories();
  }

  Search(){
    if(this.r_libelle == ""){
      this.data = this.data2;
    }else{
      
      this.data = this.data.filter(res=>{        
        return res.r_libelle.toLocaleLowerCase().match(this.r_libelle.toLocaleLowerCase());
      })
    }
  }


  openVerticalCenteredModal(content) {

    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  selectProduitPartenaire(){
    this.list_produits(parseInt(this.selectedLevel));
  }


  list_produits(val){
    this.chargementEncours = true;
    if( this.userInfos.r_profil !== 4 ){
      val = this.userInfos.r_partenaire;
    }
    this.produitServices.fs_listProduit(val).subscribe(
      (res: any = {}) => {
        this.data = res.result;
        this.data2 = res.result;
        this.dataRetour = ( res.status === 1 )? 1 : 0;
        setTimeout(() => {
          this.chargementEncours = false
        }, 500);
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
    const idpart = ( this.userInfos.r_profil == 4 )? this.selectedLevel : this.userInfos.r_partenaire;
    this.categorieServices.listCategoriePart(idpart).subscribe(
      (res: any = {})=>{
        this.categories = res.result;
      }
    )
  }

  fc_add_produit(){
    this.desacStock = false;
    this.modeAppel = 'creation';
    this.modalTitle = 'Saisir une nouveau produit';
    this.detailsProduit = {}
    this.produitData.enable();
    this.registerBtnStatus = true;

  }
  fc_details_produit(data: any = {}, mode){

    this.modalTitle = `Modification de la catégorie [ ${data.r_libelle} ]`;
    this.detailsProduit = data;
    this.desacStock = true;
    switch( mode ){
      case 1://Modification
        this.produitData.enable();
        this.registerBtnStatus = true;
        this.modeAppel = 'modif';
        break;

      case 2://Consultation
        this.produitData.disable();
        this.registerBtnStatus = false;
        break;

      default:
        break;
    }
  }

  resgister(){
    // Control des champs
    if( this.userInfos.r_profil == 4 && this.produitData.value.p_partenaire == null){
      this.swalServices.fs_modal('Sélectionnez le partenaire', 'warning');
      return;
    }

    if( this.produitData.value.r_libelle === '' || !this.produitData.value.r_libelle ){
      this.swalServices.fs_modal('Le libellé du produit est réquis', 'warning');
      return;
    }
    
    if( this.produitData.value.p_prix_vente === '' || !this.produitData.value.p_prix_vente ){
      this.swalServices.fs_modal('Le prix de vente est réquis', 'warning');
      return;
    }
    //Envoie vers le serveur api
    if( this.userInfos.r_profil !== 4 ){
      this.produitData.value.p_partenaire = this.userInfos.r_partenaire;
    }

    switch( this.modeAppel ){
      case 'creation':
        this.produitData.value.p_stock = 0;
        if( this.produitData.value.p_stock !== 0 ){
          this.swalServices.fs_modal('Veuillez ne pas saisir le stock du produit', 'warning');
          return;
        }
          this.produitServices.fs_saisieProduit(this.produitData.value).subscribe(
            (res: any = {}) =>{
              if( res.status === 1){
                ( this.userInfos.r_profil == 4 )? this.list_produits(parseInt(this.produitData.value.p_partenaire, 10)) :  this.list_produits(this.userInfos.r_partenaire);

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
                    ( this.userInfos.r_profil == 4 )? this.list_produits(parseInt(this.detailsProduit.r_partenaire, 10)) :  this.list_produits(this.userInfos.r_partenaire);
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

  ajoutStock(produit){
    Swal.fire({
      title: `[ ${produit.r_libelle} ] </br></br> Stock actuel : ${produit.r_stock}`,
    
      html:'<input id="swal-input1" placeholder="Quantité achetée" type="number" min="0" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Montant" class="swal2-input" type="number" min="0">',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      preConfirm: () => {

        this.qteAchat = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        this.mntAchat = (<HTMLInputElement>document.getElementById('swal-input2')).value;

        if( this.qteAchat == 0 || this.qteAchat == undefined ){
          Swal.showValidationMessage(
            `Veuillez saisir une quantité valide`
          );
          return;
        }

        if( this.mntAchat == 0 || this.mntAchat == undefined ){
          Swal.showValidationMessage(
            `Veuillez saisir une montant valide`
          );
          return;
        }

        this.updatestockData.p_newStock     = parseInt(produit.r_stock) + parseInt(this.qteAchat);
        this.updatestockData.p_partenaire   = this.userInfos.r_partenaire;
        this.updatestockData.p_utilisateur  = this.userInfos.r_i;
        this.updatestockData.p_quantite     = parseInt(this.qteAchat);
        this.updatestockData.p_mnt     = parseInt(this.mntAchat);
        this.updatestockData.p_produit     = produit.r_i;


        return fetch(`${api.url}/stock`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.updatestockData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res: any) => {
      
      if( res.value !== undefined ){
        if (res.value.status == 1) {
          Swal.fire(
            'Succès!',
            res.value.result,
            'success'
          );
          this.list_produits(this.userInfos.r_partenaire);
        }else{
          Swal.fire(
            'Oups!',
            res.value.result,
            'error'
          )
        }
      }

    })
  }

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

//Exportation du réçu au format PDF
generatePdf(action = 'open') {
  this.tableBody = [];
  this.tableBody.push([ 'Libellé du produit', 'Stock', 'Prix unitaire']);// Titre des colonnes
  if( Array.isArray(this.data) ){
  this.data.forEach((produit)=>{
    let tab = [];
    tab.push(produit.r_libelle, produit.r_stock, produit.r_prix_vente);
    this.tableBody.push(tab);
  });

  
      const documentDefinition = this.exportpdf.getDocumentDefinition(
      this.tableBody,'Liste des produits'
      );
      switch (action) {
        case 'open': pdfMake.createPdf(documentDefinition).open(); break;
        case 'print': pdfMake.createPdf(documentDefinition).print(); break;
        case 'download': pdfMake.createPdf(documentDefinition).download('facture_'); break;
    
        default: pdfMake.createPdf(documentDefinition).open(); break;
      }
  }else{
    this.swalServices.fs_modal('Aucune données à imprimer', 'warning');
  }

}

}
