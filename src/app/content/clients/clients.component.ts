import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss',]
})
export class ClientsComponent implements OnInit {
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  filterData;

  data: any[];
  modalTitle: string;
  formDetailsClient = this.fb.group({
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_email: [],
    p_description: [],
  });
  detailsClient: any = {};
  userInfos: any;
  chargementEncours: any = {};
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

  constructor( private clientServices: ClientsService, private excelService: ExcelService, private fb: FormBuilder,
    private modalService: NgbModal, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar) {
      this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

  ngOnInit() {
    this.listeClient();
  }

  listeClient(){
    this.clientServices.fs_listeClient().subscribe(
      ( res: any = {} ) => {
        this.data = res.result;
      }
    );
  }

  showDetailsClient(detailsClient: any, mode: string){
    this.detailsClient = detailsClient;
    this.modalTitle = `Signalitique du client [ ${detailsClient.r_nom} ${detailsClient.r_prenoms} ]`;
    ( mode.toString() == 'consult' )? this.formDetailsClient.disable() : null;

  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  //Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'liste_clients');
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
        //( this.date1 !== undefined && this.date2 !== undefined )? this.listLivraison(this.userInfos.r_partenaire, this.date1, this.date2) : null;
    }else{
       // ( this.date1 !== undefined && this.date2 !== undefined )? this.listLivraison(this.selectedLevel, this.date1, this.date2) : null;
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
