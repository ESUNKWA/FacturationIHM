import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor( private clientServices: ClientsService, private excelService: ExcelService, private fb: FormBuilder ) { }

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

  //Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'liste_clients');
  }


}
