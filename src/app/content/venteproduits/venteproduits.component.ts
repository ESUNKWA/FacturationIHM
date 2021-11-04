import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { FactureService } from 'src/app/services/facture/facture.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';

@Component({
  selector: 'app-venteproduits',
  templateUrl: './venteproduits.component.html',
  styleUrls: ['./venteproduits.component.scss']
})
export class VenteproduitsComponent implements OnInit {
  public maskUsMobile = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  viewsSaisieVente: boolean = false;
  viewsListeVente: boolean = false;
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


  constructor( private produitServices: ProduitService, private excelService: ExcelService,
                private fb: FormBuilder, private venteServices: FactureService,
                private swalServices: ModalService, private infosUtilisateur: UserInfosService,
                private partenaireServices: PartenairesService ) { }

  ngOnInit() {
    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();

    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.listVentes(this.userInfos.r_partenaire, this.today);
    this.listPartenaire();
  }

  search(term: string) {
    if (!term) {
      this.filterData = this.data;
    } else {
      this.filterData = this.data.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  views(){
    this.viewsSaisieVente = !this.viewsSaisieVente;
    this.viewsListeVente = !this.viewsListeVente;

    if( this.viewsListeVente === true ){
      this.listVentes(this.userInfos.r_partenaire, this.today);
      (<HTMLButtonElement>document.getElementById('btnVentes')).innerHTML = "Effectuer une vente";
    }

    if( this.viewsSaisieVente === true ){
      this.list_produits();
      (<HTMLButtonElement>document.getElementById('btnVentes')).innerHTML = "Voir les ventes";
      this.resetventForm();
    }

  }

  list_produits(){
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
    if( this.userInfos.r_profil !== 4 ){
      partenaireId = this.userInfos.r_partenaire;
    }

    this.venteServices.fs_list_factures(0,partenaireId, today).subscribe(
      (res: any = {}) => {
        this.data = res.result;
        setTimeout(()=>{
          this.hideLoder = false;
          this.viewsListeVente = true;
          this.viewsSaisieVente = false;
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


  isCheck(checked, ligneProduit, indexLigne){

    let qte = (<HTMLInputElement>document.getElementById(`qte-${indexLigne}`)).value = ""+1;

    if( checked === true ){

      //this.desabledInputQteProduit = false;
      ligneProduit.p_quantite = +qte;
      ligneProduit.p_total = ligneProduit.r_prix_vente;
      (<HTMLInputElement>document.getElementById(`produit-${indexLigne}`)).value = ligneProduit.p_total;

      this.choixProduits.push(ligneProduit);

    }else{
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

    this.filterParmas(this.choixProduits);

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

  reglemntPartiel(){
    this.mntRgl = this.mntRgl.nativeElement.value;

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
    this.modalTitle = ( mode == 'edit' )?`Modification de la vente N° [ ${detailsFacture.r_num} ] _______ Montant : ${detailsFacture.r_mnt} ${this.devise}`:`Consultation de la vente N° [ ${detailsFacture.r_num} ] _______ Montant : ${detailsFacture.r_mnt} ${this.devise}`;

    //Récupération des détails de la facture
    this.venteServices.fs_details_facture(detailsFacture.r_i).subscribe(
      ( res: any = {} ) => {
        this.ligneVentes = res.result;
      },
      ( err ) => console.log(err)
    );
    ( mode !== 'edit' )? this.formDetailsfacture.disable() : this.formDetailsfacture.enable();

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
