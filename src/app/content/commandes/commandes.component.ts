import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  viewsSaisieVente: boolean = false;
  viewsListeVente: boolean = true;
  saisieVente: boolean = false;
  afficheVente: boolean = true;
  //Datatable variables
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: any[];
  filterData;

  choixProduits: any = [];
  desabledInputQteProduit: any = true;
  choixProduitsFinal: any = [];
  sommes: number = 0;

  detailProduit: any = {};

  CmdData = this.fb.group({
    p_type_person: [],
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_phone2: [],
    p_email: [],
    p_description: [],
  });
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
  mntRgl: any;

  @ViewChild('paiementPartielMnt') paiementPartielMnt;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  //@ViewChild('mntRgl') mntRgl;

  mntPartiel: any = 0;
  mntPayeRestant: any = {};

  devise: string = ' fcfa';
  solder: number = 0;
  viewsBtnUpdate: string;
  userInfos: any = {};
  selectedLevel: any;
  partenaires: any = [];

  myDate = new Date();
  today: any;

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
  }



  /* search(term: string) {
    if (!term) {
      this.filterData = this.data;
    } else {
      this.filterData = this.data.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  } */

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  saisieCmd(){
    this.list_produits();
    this.saisieVente = true;
    this.afficheVente = false;
    this.chargementEncours = false;
  }

  viewsCmd(){
    this.chargementEncours = true;
    this.listVentes(this.userInfos.r_partenaire, this.today);
    this.saisieVente = false;
    this.afficheVente = true;


  }

  list_produits(){
    this.produitServices.fs_listProduit(this.userInfos.r_partenaire).subscribe(
      (res: any = {}) => {
        this.data = res.result;
      },
      (err) => console.log(err),
    );
  }


  listVentes(partenaireId, today){

    this.chargementEncours = true;

    if( this.userInfos.r_profil !== 4 ){
      partenaireId = this.userInfos.r_partenaire;
    }
    this.venteServices.fs_list_factures(1,partenaireId, today).subscribe(
      (res: any = {}) => {
        this.data = res.result;

        setTimeout(() => {
          this.chargementEncours = false;
        }, 2000);
      },
      (err) => console.log(err),
    );
  }

//Au choix d'un produits
  isCheck(checked, ligneProduit, indexLigne){
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

  // Suppressions des paramètres initules
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

  }

  step1(){


    if( this.choixProduits.length == 0 ){
      alert('Veuillez choix au moins 1 articles');
      return;
    }

    this.filterParmas(this.choixProduits);
    this.wizardForm.goToNextStep();

  }


  registerCmd(){

    this.CmdData.value.p_mnt = this.sommes;
    this.CmdData.value.p_ligneFacture = this.choixProduits;
    this.CmdData.value.p_mnt_partiel = this.mntPartiel;
    this.CmdData.value.p_cmd = 1;
    this.CmdData.value.p_utilisateur = this.userInfos.r_i,
    this.CmdData.value.p_partenaire = this.userInfos.r_partenaire;
    this.CmdData.value.p_mntTotalAchat = this.sommes;

    if( this.userInfos.r_profil !== 4 ){
      this.CmdData.value.p_partenaire = this.userInfos.r_partenaire;
    }

    this.venteServices.fs_saisie_facture(this.CmdData.value).subscribe(
      (res: any)=> {
        this.swalServices.fs_modal(res.result, 'success');
        this.resetventForm();

        //Exécute automatiquement pour afficher la liste des commandes
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
      (<HTMLButtonElement>document.getElementById('btnCmd')).dispatchEvent(evt);

      },
      (err)=> this.swalServices.fs_modal(err, 'success')
    );
  }
  resetventForm() {
    this.CmdData.reset();
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

  detailsVente(detailsFacture: any = {}, mode: string){

    this.viewsBtnUpdate = mode;

    this.detailsFacture = detailsFacture;
    this.modalTitle = ( mode == 'edit' )?`Modification de la commande N° [ ${detailsFacture.r_num} ] _______ Montant : ${detailsFacture.r_mnt} ${this.devise}`:`Consultation de la commande N° [ ${detailsFacture.r_num} ] _______ Montant : ${detailsFacture.r_mnt} ${this.devise}`;

    //Récupération des détails de la facture
    this.venteServices.fs_details_facture(detailsFacture.r_i).subscribe(
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

  reglementCmd(){
    this.venteServices.fs_updateStatusFacture(this.detailsFacture.r_i).subscribe(
      ( res: any = {} ) => {
        this.swalServices.fs_modal(`La commande N° [ ${this.detailsFacture.r_num} ] à bien été réglé`, 'success');
      }
    );
  }


  selectProduitPartenaire(){
    console.log(this.selectedLevel);
    this.listVentes(parseInt(this.selectedLevel), this.today);
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      }
    )
  }


//Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'vente');
  }

}
