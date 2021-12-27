import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuiviventescmdService } from 'src/app/services/suiviventescmd/suiviventescmd.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';

import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';

/* Importation du module PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExportfilesService } from 'src/app/services/exportfiles/exportfiles.service';


@Pipe({
  name: 'amountConverter'
})

@Component({
  selector: 'app-detailsventes',
  templateUrl: './detailsventes.component.html',
  styleUrls: ['./detailsventes.component.scss']
})
export class DetailsventesComponent implements OnInit {
  dataventeProdut: any [];
    partenaires: any = [];
    selectedLevel: number;
  selectedMode: any;
  afficheTable: number = 0;
  r_libelle: any;

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2
    }).format(Number(value));
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  data: any = [];
  data2: any = [];
  modalTitle: any;
  userInfos: any = {};
  mydate = new Date();
  today: any;
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  dataRetour: number;
  chargementEncours: boolean;
  modeConsult: any = ['Liste de ventes','Liste des ventes par regroupement'];
  afficheCBOprod: boolean = false;

  tableBody: any = [];
  
  constructor( private suiviventesServices: SuiviventescmdService, private infosUtilisateur: UserInfosService,
              private swalServices: ModalService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
              private partenaireServices: PartenairesService, private exportpdf: ExportfilesService) { 
                this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
              }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.modalTitle = `Ventes sur la période du ${this.today} au ${this.today}`;
    //this.detailsVentesCmd(this.userInfos.r_partenaire, this.today,this.today,0);
    this.listPartenaire();
    this.selectedMode = 0;
    this.dataRetour = 0;
    this.chargementEncours = false;
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

  selectPartenaire(){
    this.detailsVentesCmd(this.selectedLevel, this.date1,this.date2,0);
  }

  listPartenaire(){

    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      } 
    )
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

    this.date3 = this.date1;
    this.date4 = this.date2;
    if( this.userInfos.r_profil !== 4 ){
        ( this.date1 !== undefined && this.date2 !== undefined )? this.detailsVentesCmd(this.userInfos.r_partenaire, this.date1, this.date2, 0) : null;
    }else{
      ( this.date1 !== undefined && this.date2 !== undefined )? this.detailsVentesCmd(this.selectedLevel, this.date1, this.date2, 0) : null;

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

  detailsVentesCmd(idpartenaire,datedebut,datefin,iscmd){

    this.data = [];
    this.chargementEncours = true;

    ( this.selectedMode == 1 )? this.afficheTable = 1 : this.afficheTable = 0;

    

    switch (parseInt(this.selectedMode)) {
      case 1:
        this.suiviventesServices.ventes_par_rgpmnt(idpartenaire,datedebut,datefin,iscmd).subscribe(
          (res: any) => {
            if( res.status == 1 ){
              this.dataRetour = 1;
            }else{
              this.dataRetour = 0;
            }
            this.data = res.result;
            this.data2 = res.result;

            setTimeout(() => {
              this.date1 = undefined;
                this.date2 = undefined
              this.chargementEncours = false;
            }, 500);
            
          }
          
        )
        break;
    
      case 0:
        this.suiviventesServices.liste_produit_vendu(idpartenaire,iscmd,datedebut,datefin).subscribe(
          (res: any) => {
            if( res.status == 1 ){
              this.dataRetour = 1;
            }else{
              this.dataRetour = 0;
            }
            this.data = res.result;
            this.data2 = res.result;
            setTimeout(() => {
              this.date1 = undefined;
                this.date2 = undefined
              this.chargementEncours = false;
            }, 500);
            
          }
          
        )
        break;
    }

  }

  voirLesVentes(produit){
    
      const userid = (this.userInfos.r_profil == 4)? this.selectedLevel : this.userInfos.r_partenaire;
      
      this.suiviventesServices.produitVenduParID(userid, produit.r_i, 0, this.date3,this.date4).subscribe(
        ( res: any = {} ) =>{

            this.dataventeProdut = res.result;
            
        }
      )
  }

  //Exportation du réçu au format PDF
generatePdf(action = 'open') {
  let title;
  this.tableBody = [];
  if( this.data.length > 1 ){
    (this.selectedMode == 0)? this.tableBody.push([ 'Date de vente', 'Produits', 'Montant']) : this.tableBody.push([ 'Produits vendu', 'Quantités', 'Montant total']);// Titre des colonnes;
  this.data.forEach((produit)=>{
    let tab = [];
    if( this.selectedMode == 0  ){
      title = 'Liste des ventes';
      tab.push(produit.created_at, produit.r_libelle, produit.r_total)
    }else{
      title = 'Liste des ventes par produits';
      tab.push(produit.r_libelle, produit.totalVendu, produit.r_total)
    }
    this.tableBody.push(tab);
  });
    const documentDefinition = this.exportpdf.getDocumentDefinition(
    this.tableBody, title
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
