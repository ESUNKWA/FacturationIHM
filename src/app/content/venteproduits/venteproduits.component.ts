import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { FactureService } from 'src/app/services/facture/facture.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-venteproduits',
  templateUrl: './venteproduits.component.html',
  styleUrls: ['./venteproduits.component.scss']
})
export class VenteproduitsComponent implements OnInit {
   choixProduits: any = [];
  desabledInputQteProduit: any = true;
  choixProduitsFinal: any = [];
  sommes: number = 0;

  detailProduit: any = {};

  infosClient = this.fb.group({
    p_type_person: [],
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_phone2: [],
    p_email: [],
    p_description: []
  });
  selectedOption = '3';
  dataVentes: any = [];
  modalTitle: string;
  detailsFacture: any = {};
  ligneVentes: any = [];

  formDetailsfacture = this.fb.group({
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_email: [],
    p_description: [],
  });

  InputPaiementPartiel: boolean = false;

  @ViewChild('paiementPartielMnt') paiementPartielMnt;
  @ViewChild('mntRgl') mntRgl;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  mntPartiel: any = 0;
  mntPayeRestant: any = {};

  devise: string = ' fcfa';
  solder: number = 0;
  viewsBtnUpdate: string;
  userInfos: any = {};
  hideLoder: boolean = true;
  selectedLevel: string;
  partenaires: any = [];

  myDate = new Date();
  today: any;
  afficheVente: boolean = true;
  saisieVente: boolean = false;
  data: any;
  chargementEncours: boolean;
  modifCmd: boolean = false;

  constructor( private produitServices: ProduitService, private excelService: ExcelService,
                private fb: FormBuilder, private venteServices: FactureService,
                private swalServices: ModalService, private infosUtilisateur: UserInfosService,
                private partenaireServices: PartenairesService, private modalService: NgbModal ) { }

  ngOnInit() {
    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();

    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.listVentes(this.userInfos.r_partenaire, this.today);
    this.listPartenaire();
    //this.list_produits();
  }


  saisieVentes(){
    this.list_produits();
    this.saisieVente = true;
    this.afficheVente = false;
    this.chargementEncours = false;
  }
  viewsVentes(){
    this.listVentes(this.userInfos.r_partenaire, this.today);
    this.saisieVente = false;
    this.afficheVente = true;
    this.chargementEncours = true;
  }

  list_produits(){
    this.data = [];
    this.produitServices.fs_listProduit(this.userInfos.r_partenaire).subscribe(
      (res: any = {}) => {
        this.data = res.result;

      },
      (err) => console.log(err),
    );
  }

  selectProduitPartenaire(){
    console.log(this.selectedLevel);
    this.listVentes(parseInt(this.selectedLevel),this.today);
  }

  listVentes(partenaireId, today){

    this.chargementEncours = true;

    if( this.userInfos.r_profil !== 4 ){
      partenaireId = this.userInfos.r_partenaire;
    }

    this.venteServices.fs_list_factures(0,partenaireId, today).subscribe(
      (res: any = {}) => {
        this.data = res.result;
        setTimeout(()=>{
          this.chargementEncours = false;
        }, 2000);
      },
      (err) => console.log(err),
    );
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      }
    )
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }


  isCheck(checked, ligneProduit, indexLigne){
console.log(checked);
    if( ligneProduit.r_stock == 0 ){
      //(<HTMLInputElement>document.getElementById(`checkbox1-${indexLigne}`)).checked = false;
      alert('Stock épuisé');
      return;
    }

    let qte = (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).value = ""+1;
    (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).disabled = false;

    if( checked === true ){

      //this.desabledInputQteProduit = false;
      ligneProduit.p_quantite = +qte;
      ligneProduit.p_total = ligneProduit.r_prix_vente;
      (<HTMLInputElement>document.getElementById(`produit-${indexLigne}`)).value = ligneProduit.p_total;

      this.choixProduits.push(ligneProduit);

    }else{
      (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).disabled = true;
      (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).value = ""+0;
      (<HTMLInputElement>document.getElementById(`produit-${indexLigne}`)).value = ""+0;
      this.choixProduits = this.choixProduits.filter((produit)=>produit.r_i !== ligneProduit.r_i );
    }

    this.calculMntTotalAchat(this.choixProduits, 'choix');
  }

  choixqteProduit(qte, indexLigne, ligneProduit){

   if( ligneProduit.r_stock < qte.value ){
     alert('Stock épuisé');
     (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).value = ligneProduit.r_stock;
     return;
   }

    let total = (<HTMLInputElement>document.getElementById(`produit-${indexLigne}`)).value = (""+qte.value * ligneProduit.r_prix_vente);

    this.choixProduits.find( (produit)=>produit.r_i == ligneProduit.r_i);
    ligneProduit.p_quantite = +qte.value;
    ligneProduit.p_total = +total;


    this.calculMntTotalAchat(this.choixProduits, 'ajoutQte');
  }

  calculMntTotalAchat(produit: any, mode: string){
    this.sommes = 0;
    produit.forEach((el) =>{
      this.sommes = this.sommes + el.p_total
    });
  }

  filterParmas(produit: any){
    produit.forEach((el) =>{

      delete el.created_at;
      delete el.r_categorie;
      //delete el.r_libelle;
      //delete  el.r_prix_vente;
      delete el.r_status;
      delete el.r_description;
      delete el.updated_at;

      el.p_idproduit = el.r_i;
      el.p_stock_restant = el.r_stock - el.p_quantite;


      //delete el.r_i;
      //delete el.r_stock;

    });
  }

  stepControl1(){

    if( this.choixProduits.length === 0 ){
      this.swalServices.fs_modal('Veuillez choisir au moins 1 article', 'warning');
      return;
    }
    //Exécute automatiquement le btn step
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    (<HTMLButtonElement>document.getElementById('continue')).dispatchEvent(evt)
  }

  step1(){

    if( this.choixProduits.length == 0 ){
      alert('Veuillez choix au moins 1 articles');
      return;
    }

    this.filterParmas(this.choixProduits);
    this.wizardForm.goToNextStep();

  }

  step2(){



  }

  registerVente(){

    this.infosClient.value.p_mnt = this.sommes;
    this.infosClient.value.p_ligneFacture = this.choixProduits;
    this.infosClient.value.p_mnt_partiel = this.mntPartiel;
    this.infosClient.value.p_cmd = 0;
    this.infosClient.value.p_partenaire = this.userInfos.r_partenaire;


    this.venteServices.fs_saisie_facture(this.infosClient.value).subscribe(
      (res: any)=> {
        this.swalServices.fs_modal(res.result, 'success');
        this.resetventForm();

        //Exécute automatiquement pour afficher la liste des commandes
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
        (<HTMLButtonElement>document.getElementById('btnVentes')).dispatchEvent(evt);

      },
      (err)=> this.swalServices.fs_modal(err, 'success')
    );
  }
  resetventForm() {
    this.infosClient.reset();
    this.choixProduits.length = 0;
    this.sommes = 0;
    this.InputPaiementPartiel = false;
  }

  reglemntPartiel(mntPartiel){
    this.mntRgl = parseInt(mntPartiel, 10);

     this.mntRgl == (this.detailsFacture.r_mnt - +this.ligneVentes[0].mnt_paye)? this.solder = 1 : this.solder = 0;

    this.venteServices.fs_reglementPartiel(this.detailsFacture.r_i, this.mntRgl, this.solder, this.detailsFacture.r_partenaire).subscribe(
      ( res: any = {} ) => {
        this.swalServices.fs_modal(res.result, 'success');
      }
    );
  }

  detailsVente(data: any = {}, mode: string){

    this.viewsBtnUpdate = mode;

    this.detailsFacture = data;
    this.modalTitle = ( mode == 'edit' )?`Modification de la vente N° [ ${data.r_num} ] _______ Montant : ${data.r_mnt} ${this.devise}`:`Consultation de la vente N° [ ${data.r_num} ] _______ Montant : ${data.r_mnt} ${this.devise}`;

    //Récupération des détails de la facture
    this.venteServices.fs_details_facture(data.r_i).subscribe(
      ( res: any = {} ) => {
        this.ligneVentes = res.result;
      },
      ( err ) => console.log(err)
    );
    if( mode !== 'edit' ){
      this.formDetailsfacture.disable();
      this.modifCmd = true;
    }else{
      this.formDetailsfacture.enable();
      this.modifCmd = false;
    }
  }

  isCheckPaiement(data: any){

    this.InputPaiementPartiel = data;

    this.mntPartiel = 0;
  }

  valMntPartiel(){
    this.mntPartiel = +this.paiementPartielMnt.nativeElement.value;
  }

//Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'vente');
  }

}
