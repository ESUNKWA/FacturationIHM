import { LivraisonService } from './../../services/livraison/livraison.service';
import { Component, OnInit } from '@angular/core';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  userInfos: any = {};
  chargementEncours: boolean;
  data: any[];
  selectedLevel: number;
  partenaires: any = [];
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  hoveredDate: NgbDate | null = null;
  today: any;
  myDate = new Date();
  dataRetour: any;
  client: any = {};
  detailLivraisons: any = [];
  modalTitle: string;
  situationGeo: any;

  constructor( private livraisonServices: LivraisonService, private infosUtilisateur: UserInfosService,
                private modalService: NgbModal, private partenaireServices: PartenairesService,
                public formatter: NgbDateParserFormatter, private calendar: NgbCalendar) {
                  this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
                 }

  ngOnInit(): void {
    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();
    this.date3 = this.date4 = this.today;
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur()

    this.listLivraison(this.selectedLevel = this.userInfos.r_partenaire, this.today, this.today);
    this.listPartenaire();
  }

  listLivraison(idpartenaire, date1, date2){
    let val;
     val = ( this.userInfos.r_profil == 4 )? this.selectedLevel : idpartenaire;

    this.chargementEncours = true;

    this.livraisonServices.listLivraisons(val, date1, date2).subscribe(
      (res: any ={})=>{
        if( res.status == 1 ){
          this.dataRetour = 1;

        }else{
          this.dataRetour = 0;
        }
        this.data = res.result;
        setTimeout(()=>{
          this.date1 = undefined;
          this.date2 = undefined
          this.chargementEncours = false;
        },500);
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
      }
    )
  }
  details_livraison(data: any){
    this.situationGeo = data.r_situa_geo;
    this.livraisonServices.detailsLivraisons(data.r_vente, this.date3, this.date4).subscribe(
      (res: any = {})=>{
        this.client = res.client
        this.detailLivraisons = res.details_achat;
        this.modalTitle = 'Détail de la livraison de [ ' + this.client.r_nom + ' '+ this.client.r_prenoms + ' ]';
      }
    )
  }

  updateStatus(ligneLivraison, action: number){
console.log(ligneLivraison);

    Swal.fire({
      title: 'Livraison terminée ?',
      text: 'Livraison à ' + ligneLivraison.r_quartier,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Valider !'
    }).then((result) => {

      this.livraisonServices.updateLivraisons(ligneLivraison.r_i, action).subscribe(
        (res: any ={})=>{
          if (result.isConfirmed) {
            Swal.fire(
              'Terminer!',
              res.result,
              'success'
            )
          }
          this.listLivraison(this.selectedLevel = this.userInfos.r_partenaire, this.today, this.today);
        }
      )


    })
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
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
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listLivraison(this.userInfos.r_partenaire, this.date1, this.date2) : null;
    }else{
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listLivraison(this.selectedLevel, this.date1, this.date2) : null;
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

}
