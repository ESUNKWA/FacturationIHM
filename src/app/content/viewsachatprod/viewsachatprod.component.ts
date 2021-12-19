import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PartenairesService } from 'src/app/services/partenaires/partenaires.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';

@Component({
  selector: 'app-viewsachatprod',
  templateUrl: './viewsachatprod.component.html',
  styleUrls: ['./viewsachatprod.component.scss']
})
export class ViewsachatprodComponent implements OnInit {
  userInfos: any = {};
  chargementEncours: boolean;
  data: any[];
  selectedLevel: number;
  selectedMode: number;
  selectedproduit: number = 10;
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
  partenaires: any = [];
  modeAchat: any = ['Liste de achats','Liste de achats par regroupement', 'Liste de achats par produit'];
  produits: any = [];
  valMode: number;
  afficheCBOprod: boolean = false;

  constructor(private infosUtilisateur: UserInfosService,
    private modalService: NgbModal, private partenaireServices: PartenairesService,
    private consultAchatProd: ProduitService, public formatter: NgbDateParserFormatter, 
    private calendar: NgbCalendar, private produitServices: ProduitService, private swalServices: ModalService,) { 
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
     }

  ngOnInit(): void {
    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();
    this.date3 = this.date4 = this.today;
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur()

    this.listAchatProd(this.selectedMode = 0, this.selectedLevel = this.userInfos.r_partenaire, this.today, this.today);
    this.listPartenaire();
    this.list_produits(this.userInfos.r_partenaire);
  }

  listPartenaire(){
    this.partenaireServices.listPartenaires().subscribe(
      (res: any = {})=>{
        this.partenaires = res.result;
        
      }
    )
  }

  list_produits(val){
    this.chargementEncours = true;
    if( this.userInfos.r_profil !== 4 ){
      val = this.userInfos.r_partenaire;
    }
    this.produitServices.fs_listProduit(val).subscribe(
      (res: any = {}) => {
        this.produits = res.result;
        setTimeout(() => {
          this.chargementEncours = false
        }, 1000);
      },
      //(err) => this.swalServices.fs_modal(err, 'error')
    );
  }

  listAchatProd(selectedMode, idpartenaire, date1, date2){
    
    let val;
     val = ( this.userInfos.r_profil == 4 )? this.selectedLevel : idpartenaire;

    this.chargementEncours = true;
   this.valMode = parseInt(selectedMode);
    switch (this.valMode) {
      case 0:
        
        this.consultAchatProd.consult_achat_produit(val, date1, date2).subscribe(
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
        break;

      case 1:
     this.consultAchatProd.consult_achat_produit_rgpmt(val, date1, date2).subscribe(
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
        break;

      case 2:
        if( this.selectedproduit == 0 ){
          this.swalServices.fs_modal('Veuillez sélectionner le produit','warning');
          return;
        }else{
          this.consultAchatProd.consult_achat_par_produit(val, this.selectedproduit, date1, date2).subscribe(
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
        
        break;
    
      default:
        break;
    }

    
  }

  etatCBOproduit(){
    
    if( this.selectedMode == 2 ){
      this.afficheCBOprod = true;
    }else{
      this.afficheCBOprod = false;
    }
    
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
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listAchatProd(this.selectedMode,this.userInfos.r_partenaire, this.date1, this.date2) : null;
    }else{
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listAchatProd(this.selectedMode,this.selectedLevel, this.date1, this.date2) : null;
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
