import { Component, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


import { DashService } from 'src/app/services/dashboard/dash.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';

export type apexChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle

};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {



  chargementEncours: boolean;
  currentDate: NgbDateStruct;
  topProduitMois: any = [];
  dashData: any = {};
  userInfos: any = {};
  surveyData = [];
  recetteJr: number;
  recetteJrRestant: number;
  recetteMois: number;


  constructor(private calendar: NgbCalendar, private dashboard: DashService, private infosUtilisateur: UserInfosService) {}

  ngOnInit(): void {
    this.currentDate = this.calendar.getToday();

    this.chargementEncours = true;

    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();


    this.dashboard.fs_dash(this.userInfos.r_partenaire).subscribe(
      (res: any = {}) => {

        this.dashData = res.result[0];
        const chiffreAffMois = res.result[1];

        this.recetteJr = parseInt(this.dashData.ventejr) + parseInt(this.dashData.reglPartielJr);

        this.recetteJrRestant = parseInt(this.dashData.venteNonSoldees) - parseInt(this.dashData.reglPartielJr);
        this.recetteMois = parseInt(chiffreAffMois.reglPartielMois) + parseInt(chiffreAffMois.venteMois);
        this.topProduitMois = res.result[2];

        this.surveyData = this.topProduitMois;

        setTimeout(() => {
          this.chargementEncours = false;
        }, 2000);
      }
    )

  }

}
