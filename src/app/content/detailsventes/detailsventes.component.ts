import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuiviventescmdService } from 'src/app/services/suiviventescmd/suiviventescmd.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';


@Pipe({
  name: 'amountConverter'
})

@Component({
  selector: 'app-detailsventes',
  templateUrl: './detailsventes.component.html',
  styleUrls: ['./detailsventes.component.scss','../../../assets/icon/icofont/css/icofont.scss']
})
export class DetailsventesComponent implements OnInit {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2
    }).format(Number(value));
  }

  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: any;
  modalTitle: any;
  userInfos: any = {};
  mydate = new Date();
  today: any;
  date1: any;
  date2: any;
  dataRetour: number;
  hideLoder: boolean = true;
  
  constructor( private suiviventesServices: SuiviventescmdService, private infosUtilisateur: UserInfosService,
              private swalServices: ModalService ) { }

  ngOnInit() {
    this.todayDate();
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.modalTitle = `Ventes sur la période du ${this.today} au ${this.today}`;
    this.detailsVentesCmd(this.userInfos.r_partenaire, this.today,this.today,0);
  }

  todayDate(){
    this.today = this.mydate.getFullYear()+'-'+(this.mydate.getMonth()+1)+'-'+this.mydate.getDate();
  }

  checkVenteCmd(){

    if( this.date1 == undefined ){
      this.swalServices.fs_modal('Veuillez sélectionner la date de début','warning');
      return;
    }
    if( this.date2 == undefined ){
      this.swalServices.fs_modal('Veuillez sélectionner la date de fin','warning');
      return;
    }

    this.hideLoder = true;
    this.modalTitle = `Ventes sur la période du ${this.date1} au ${this.date2}`;
    this.detailsVentesCmd(this.userInfos.r_partenaire, this.date1,this.date2,0);
  }

  detailsVentesCmd(idpartenaire,datedebut,datefin,iscmd){
    
    this.suiviventesServices.detailsVentesCmd(idpartenaire,datedebut,datefin,iscmd).subscribe(
      (res: any) => {
        if( res.status == 1 ){
          this.dataRetour = 1;
        }else{
          this.dataRetour = 0;
        }
        setTimeout(() => {
          this.data = res.result;
          this.hideLoder = false;
        }, 2000);
        
      }
      
    )
  }

}
