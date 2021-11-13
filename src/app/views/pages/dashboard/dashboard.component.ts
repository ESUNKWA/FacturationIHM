import { Component, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle, ChartType } from 'ng-apexcharts';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


import { DashService } from 'src/app/services/dashboard/dash.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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

  /**
   * Bar chart
   */
   public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    { backgroundColor: ["#b1cfec","#7ee5e5","#66d1d1","#f77eb9","#4d8af0"] }
  ]
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total (fcfa)' }
  ];



  /**
   * Line chart
   */


  chargementEncours: boolean;
  currentDate: NgbDateStruct;
  topProduitMois: any = [];
  dashData: any = {};
  userInfos: any = {};

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

        this.topProduitMois.forEach(element => {
          
          this.barChartLabels.push(element.name);
          this.barChartData[0]['data'].push(element.value);
          
        });

        setTimeout(() => {
          this.chargementEncours = false;
        }, 2000);
      }
    )

  }

}
