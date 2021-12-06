import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { FactureService } from 'src/app/services/facture/facture.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { ClientsService } from 'src/app/services/clients/clients.service';
/* Importation du module PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


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
  dataRetour: any;
  detailProduit: any = {};
  etat: boolean;
  infosClient = this.fb.group({
    p_type_person: [],
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_phone2: [],
    p_email: [],
    p_description: []
  });
  livraisonData = this.fb.group({
    p_ville: [1],
    p_quartier: [],
    p_frais: [],
    p_situation_geo: []
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
  remise = false;
  @ViewChild('paiementPartielMnt') paiementPartielMnt;
  @ViewChild('remise1') remise1;
  @ViewChild('remise2') remise2;
  @ViewChild('remise3') remise3;
  @ViewChild('mntRgl') mntRgl;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  mntPartiel: any = 0;
  MntRemise: number = 0;
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
  data: any = [];
  chargementEncours: boolean;
  modifCmd: boolean = false;
  remise1Input: any;
  remise2Input: any;
  remise3Input: any;
  spinner: boolean = false;
  dataProduits:any = [];
  modiVentes: boolean = true;
  affichPU: any;
  totalAchat: any;
  venteUpdateData: any = {};
  /* New ligne de vente update */
  dkem: any = [];
  newLigneVente: any = [];

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  date1: any;
  date2: any;
  viewAction: boolean = true;
  tabs: number;
  formLivraion: boolean = false;
  modeDetail: string;
  InputsRemise: boolean;
  sommesRecap: any;

  infoPartenaire: any = {};
  tableTitle: any = [ 'Désignation', 'Quantité', 'Prix unitaire', 'Prix total' ];
  tableBody: any = [];
  printData: any = {};
  infosPatenaire: any;

  constructor( private produitServices: ProduitService, private excelService: ExcelService,
                private fb: FormBuilder, private venteServices: FactureService,
                private swalServices: ModalService, private infosUtilisateur: UserInfosService,
                private partenaireServices: PartenairesService, private modalService: NgbModal,
                private alertStockProduit: ProduitService, private clientServices: ClientsService,
                public formatter: NgbDateParserFormatter, private calendar: NgbCalendar,) {
                  this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }

  ngOnInit() {
    
    this.infosPatenaire = JSON.parse(localStorage.getItem('infosPartenaire'));
    console.log(this.infosPatenaire);
    

    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();

    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.listVentes(this.userInfos.r_partenaire, this.today, this.today);
    this.listPartenaire();
    this.list_produits();
    //this.InputsRemise = false;
    //this.InputPaiementPartiel = false;

    this.tableBody.push(  this.tableTitle);
  }


  saisieVentes(){
    this.list_produits();
    this.choixProduits.length = 0
    this.saisieVente = true;
    this.afficheVente = false;
    this.chargementEncours = false;
  }
  viewsVentes(){
    this.listVentes(this.userInfos.r_partenaire, this.today, this.today);
    this.saisieVente = false;
    this.afficheVente = true;
    this.chargementEncours = true;
  }

  list_produits(){

    this.produitServices.fs_listProduit(this.userInfos.r_partenaire).subscribe(
      (res: any = {}) => {
        this.dataProduits = res.result;
      },
      (err) => console.log(err),
    );
  }

  selectProduitPartenaire(){
    //this.listVentes(parseInt(this.selectedLevel),this.date1, this.date2);
  }

  listVentes(partenaireId, date1, date2){

    this.chargementEncours = true;

    if( this.userInfos.r_profil !== 4 ){
      partenaireId = this.userInfos.r_partenaire;
    }

    this.venteServices.fs_list_factures(0,partenaireId, date1, date2).subscribe(
      (res: any = {}) => {
        if( res.status == 1 ){
          this.dataRetour = 1;
        }else{
          this.dataRetour = 0;
        }
        this.data = res.result;

        setTimeout(()=>{
          this.chargementEncours = false;
        }, 1);
      },
      (err) => console.log(err),
    );
  }

  islivraison(livraison){
    this.formLivraion = ( livraison.checked === true )? true : false;
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

  selectProduits(produits, idproduit,tr,ligneVentes){

    const a = produits.find((el)=> el.r_i == idproduit );
    (<HTMLInputElement>document.getElementById(`updateqte-${tr}`)).value = ""+1;//Quantité initiale
   let prixvente = (<HTMLTableElement>document.getElementById(`updatePU-${tr}`)).textContent = a.r_prix_vente;//Prix de vente
   (<HTMLInputElement>document.getElementById(`updatetotal-${tr}`)).textContent = prixvente; //Sous total


   //********* */
    this.venteUpdateData.p_utilisateur = this.userInfos.r_i;
    this.venteUpdateData.p_facture = this.detailsFacture.r_i;


    //Récupération des id de chaque ligne de vente
    const tabIdLigneVentes = [];
    ligneVentes.forEach(item => tabIdLigneVentes.push(item.r_i) );

    this.getNewLigneVente(tabIdLigneVentes);
    this.getNewTotal(tabIdLigneVentes);
  }

  /* Nouveau total lors de la modification de la vente */
  getNewLigneVente(val: any=[]){
    this.dkem = [];
    val.forEach(element => {
      let newLigneVente:any = {}, produit, quantite,total;

      produit = (<HTMLInputElement>document.getElementById(`updatelibprod-${element}`)).value;
      quantite = (<HTMLInputElement>document.getElementById(`updateqte-${element}`)).value;
      total = (<HTMLInputElement>document.getElementById(`updatetotal-${element}`)).textContent;

      newLigneVente.p_idlignevente = element;
      newLigneVente.p_idproduit = parseInt(produit);
      newLigneVente.p_quantite = parseInt(quantite);
      newLigneVente.p_total = parseInt(total);
      newLigneVente.p_utilisateur = this.userInfos.r_i;

      this.dkem.push(newLigneVente);

    });
    console.log(this.dkem);

    //this.venteUpdateData.p_mnt = newtotal;
  }

  getNewTotal(val: any=[]){
    let newtotal = 0;
    val.forEach(item => newtotal = newtotal +  parseInt((<HTMLInputElement>document.getElementById(`updatetotal-${item}`)).textContent ));

    this.venteUpdateData.p_mnt = newtotal;
    this.venteUpdateData.p_mntTotalAchat = newtotal;
    console.log(newtotal);

  }

  updtaQteVendu(qte, indexLigne, ){

    let PU:any = (<HTMLTableElement>document.getElementById(`updatePU-${indexLigne}`)).textContent;
    let total = (<HTMLInputElement>document.getElementById(`updatetotal-${indexLigne}`)).textContent = (""+qte.value * PU);

    let c = this.dkem.find((item)=> item.p_idlignevente == indexLigne);
    c.p_quantite = parseInt(qte.value);
    c.p_total = parseInt(total);

    let tabIdLigneVentes = [];
    this.dkem.forEach(item => tabIdLigneVentes.push(item.p_idlignevente) );
    console.log(tabIdLigneVentes);

    this.getNewTotal(tabIdLigneVentes);
  }

  registerUpdateVente(){

    if( this.dkem.length == 0 ){
      this.swalServices.fs_modal('Veuillez modifier les informations','warning');
      return;
    }

    this.venteUpdateData.p_ligneventes = this.dkem;

    this.venteServices.update_vente(this.venteUpdateData).subscribe(
      (res: any = {})=>{
        ( res.status == 1 )? this.swalServices.fs_modal(res.result,'success') : this.swalServices.fs_modal(res.result,'warning');
        this.listVentes(this.userInfos.r_partenaire, this.today, this.today);
      }
    )

  }

  registerUpdateClient(){
    this.formDetailsfacture.value.idCLient = this.detailsFacture.r_client;
    this.formDetailsfacture.value.r_utilisateur = this.userInfos.r_i;
    console.log(this.formDetailsfacture.value);

    this.clientServices.update_client(this.formDetailsfacture.value).subscribe(
      (res: any = {})=>{
        if( res.status == 1 ) {
          this.swalServices.fs_modal(res.result,'success');
        } this.listVentes(this.userInfos.r_partenaire, this.today, this.today);
      }
    )

  }


  tabsActive(tabs){

    switch (this.modeDetail) {
      case 'edit':
        this.tabs = tabs;
        break;

      default:
        this.tabs = 0;
        break;
    }


  }

  selectPartenaire(){

  }

  //   Datepicker select période
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      const datefin = ( this.toDate.day < 10 )? '0'+this.toDate.day : this.toDate.day;
      this.date2 = `${this.toDate.year}-${this.toDate.month}-${datefin}`;
    } else {
      this.toDate = null;
      this.fromDate = date;
      const datedebut = ( this.fromDate.day < 10 )? '0'+this.fromDate.day : this.fromDate.day;
      this.date1 = `${this.fromDate.year}-${this.fromDate.month}-${datedebut}`;

    }

    if( this.userInfos.r_profil !== 4 ){
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listVentes(this.userInfos.r_partenaire, this.date1, this.date2) : null;
    }else{
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listVentes(this.selectedLevel, this.date1, this.date2) : null;

    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  //   Datepicker select période Fin

  isCheck(checked, ligneProduit, indexLigne){

    if( ligneProduit.r_stock == 0 ){
      //(<HTMLInputElement>document.getElementById(`checkbox1-${indexLigne}`)).checked = false;
      this.swalServices.fs_modal('Stock épuisé', 'warning');
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
     this.swalServices.fs_modal('Stock épuisé', 'warning');
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
      this.swalServices.fs_modal('Veuillez choisir au moins 1 article', 'warning');
      return;
    }

    this.sommesRecap = this.MntRemise || this.sommes;
    this.filterParmas(this.choixProduits);
    this.wizardForm.goToNextStep();

  }

  step2(){



  }

//Récupération du montant sans la dévise
  getRemise(remise){
    let mnt, tab, lastElt;
    mnt = remise.value;//Récupération du montant avec la dévise
    tab = mnt.split(' ');//Convertion du montant en tableau
    lastElt = tab.pop();

    return +tab.join('');
  }

  valReduction(modeRemise, remise){
   let a, b, c;
    switch (modeRemise) {
      case 1:
        a = this.getRemise(remise);
        this.MntRemise = this.sommes - (this.sommes * (a/100));
        break;

      case 2:
        b = this.getRemise(remise);

        this.MntRemise = this.sommes - b;
        break;

      default:
        c = this.getRemise(remise);
        this.MntRemise = c;
        break;
    }
//this.sommes = this.MntRemise;
    console.log('this.MntRemise',this.MntRemise,'this.sommes====',this.sommes);


  }

  etatInputRemise(){
    console.log(this.etat);

  }

  registerVente(){

    this.spinner = true

    this.infosClient.value.p_mnt = ( this.MntRemise == 0 )? this.sommes : this.MntRemise;
    this.infosClient.value.p_ligneFacture = this.choixProduits;
    this.infosClient.value.p_mnt_partiel = this.mntPartiel;
    this.infosClient.value.p_mntTotalAchat = this.sommes;
    this.infosClient.value.p_cmd = 0;
    this.infosClient.value.p_partenaire = this.userInfos.r_partenaire;
    this.infosClient.value.p_utilisateur = this.userInfos.r_i

    this.infosClient.value.p_livraison =  ( this.formLivraion )? this.livraisonData.value : null;

    this.venteServices.fs_saisie_facture(this.infosClient.value).subscribe(
      (res: any)=> {
        this.swalServices.fs_modal(res.result, 'success');
        this.resetventForm();
        this.spinner = false;
        //Exécute automatiquement pour afficher la liste des commandes
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
        (<HTMLButtonElement>document.getElementById('btnVentes')).dispatchEvent(evt);

      },
      (err)=> this.swalServices.fs_modal(err, 'error')
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
        this.listVentes(this.userInfos.r_partenaire, this.today, this.today);
        //Exécute automatiquement le btn step
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    (<HTMLButtonElement>document.getElementById('close')).dispatchEvent(evt)
      }
    );
  }

  update(indexLigne){

    (<HTMLInputElement>document.getElementById(`updateqte-${indexLigne}`)).disabled = false;
    (<HTMLInputElement>document.getElementById(`updatelibprod-${indexLigne}`)).disabled = false;
  }

  detailsVente(data: any = {}, mode: string){
    this.modiVentes = true;
    this.viewsBtnUpdate = mode;
    this.modeDetail = mode;
    this.detailsFacture = data;
    console.log(data);
    
    switch (mode) {
      case 'edit':
        this.getDetailsventes(this.detailsFacture.r_i);
        this.formDetailsfacture.disable();
        this.modifCmd = true;
        this.viewAction = true;
        this.modalTitle = `Modification de la vente N° [ ${data.r_num} ] _______ Montant : ${data.r_mnt} ${this.devise}`;
        break;

      case 'views':
        this.getDetailsventes(this.detailsFacture.r_i);
        this.tabs = 0;
        this.formDetailsfacture.enable();
        this.modifCmd = false;
        this.viewAction = false;
        this.modalTitle = `Consultation de la vente N° [ ${data.r_num} ] _______ Montant : ${data.r_mnt} ${this.devise}`;
      break;
    
      default:
        this.getDetailsventes(this.detailsFacture.r_i);
        if( this.tableBody.length > 1 ){
          this.generatePdf('open');
        }
        
        break;
    }
  }
 //Récupération des détails de la facture
  getDetailsventes(venteId){
   let tab = [];
    this.venteServices.fs_details_facture(venteId).subscribe(
      ( res: any = {} ) => {
        this.ligneVentes = res.result;
        this.tableBody = [];
        this.tableBody.push(this.tableTitle);
        this.ligneVentes.forEach(el => {
          tab = [];
          tab.push(el.libelle_produit, el.r_quantite, el.r_prix_vente, el.r_total);
          this.tableBody.push(tab);
        });
        this.tableBody.push(
          [ '','','',{ text: this.detailsFacture.r_mnt_total_achat + ' fcfa', bold: true } ]);
        
      },
      ( err ) => console.log(err)
    );
  }

  isCheckPaiement(value: any){
    //this.InputPaiementPartiel = value;
    //this.remise = !value;
    this.InputPaiementPartiel = true;
    this.InputsRemise = false
    this.mntPartiel = 0;
  }

  isCheckRemise(value: any){
    this.InputsRemise = true
    this.InputPaiementPartiel = false;
    this.MntRemise = 0

  }

  valMntPartiel(val){

    this.mntPartiel = this.getRemise(val);

  }

//Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'vente');
  }

  //Exportation du réçu au format PDF
  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download('factune_'+this.infoPartenaire.num); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition() {
    sessionStorage.setItem('infoPartenaire', JSON.stringify(this.infoPartenaire));
    return {

      pageSize: 'A4',
      /* Entête et pieds de page */
    /*   header: {
        columns: [

          {
            text:'simple text',
            style:'dkem',

          }

        ]
      }, */

      /* footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      }, */
      /* Corps du PDF */
      content: [
        /* {
          columns: [
            [
              {
                text: 'Intitulé: Produits facturésdgffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
              }
            ]
          ],
          style: 'entete'
        }, */
        {
          columns: [
            [
              {
                text: 'Facture N° : ' + this.detailsFacture.r_num,
                
              },
              {
                text: this.detailsFacture.created_at
              }
            ]
          ],
          style: 'facture'
        },

        {
          columns: [
            [{
              text: 'Boutique/Commerce :',
              decoration: 'underline'
            },
            {
              text: this.infosPatenaire[0].r_nom,
            },
            {
              text: this.infosPatenaire[0].r_quartier
            },
            {
              text:this.infosPatenaire[0].email || '',
            },
            {
              text: this.infosPatenaire[0].phone || '',
            }
            ],
          ],

        },
        {
          columns: [
            [{
              text: 'A : Client/ Destinataire :',
              decoration: 'underline'
            },
              {
                text: this.detailsFacture.r_nom + ' ' + this.detailsFacture.r_prenoms,
                style: 'nomclient'
              },
              {
                text: this.detailsFacture.r_phone || 'Pas de numéro',
                style: 'phoneclient'
              },
              {
                text: 'Abidjan',
                style: 'ville'
              }
            ]
          ],
          alignment: 'right'
        },
        {
          text: 'Intitulé: Produits facturés',
          style: 'header'
        },
        {
          columns : [
            {
              layout: 'lightHorizontalLines', // optional
              table: { 
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
               // headerRows: 1,
                widths: [ '*', 'auto', 100, '*' ],
                border: true,

                body: this.tableBody
              }
            }
          ]
        },
        {
          columns: [
            [{
              text: 'En votre aimable règlement'
            },
            {
              text: 'Cordialement'
            },
            {
              text: 'Devise de l’opération est le Franc cfa (Fcfa).'
            }]
          ],
          style: 'note'
        },
        {
          columns: [
            {
              text: this.infosPatenaire[0].r_quartier + ' '+ this.infosPatenaire[0].r_situation_geo
            }
          ],
          style: 'piedpage'
        }
      ],


      info: {
        title: "recu" + '_facture',
        author: "VentePro",
        subject: 'infoPartenaire',
        keywords: 'infoPartenaire, ONLINE infoPartenaire',
      },
      /* Style du PDf */
        styles: {
          header: {
            fontSize: 12,
            /*bold: true,*/
            margin: [0, 20, 0, 10],
            decoration: 'underline',
            color: 'blue',
            alignment: 'left',
          },
          name: {
            fontSize: 16,
            bold: true,
            color: 'red',
            marginleft: '200'
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          dkem:{
            color: 'red',
            height: '200',

          },
          piedpage: {
            margin:[0, 350, 0, 0],
            alignment: 'center'
          },
          note:{
            margin: [0, 50, 0, 0]
          },
          facture: {
            bold: true,
                alignment: 'right',
          }
        }
    };
  }

  //Alerte stock
  alerteStockProduit(){
    this.alertStockProduit.alertStock(this.userInfos.r_partenaire).subscribe(
      ( res: any = {} )=>{
        this.data = res.result;
      }
    )
  }

}
