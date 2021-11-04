import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {


  /**
   * Bar chart
   */
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [ "China", "America", "India", "Germany", "Oman"];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    { backgroundColor: ["#b1cfec","#7ee5e5","#66d1d1","#f77eb9","#4d8af0"] }
  ]
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [2478,5267,734,2084,1433], label: 'Population' }
  ];



  /**
   * Line chart
   */
  public lineChartData: ChartDataSets[] = [
    { data: [86,114,106,106,107,111,133,221,783,2478], label: 'Africa', fill: false },
    { data: [282,350,411,502,635,809,947,1402,3700,5267], label: 'Asia', fill: false }
  ];
  public lineChartLabels: Label[] = ['1500','1600','1700','1750','1800','1850','1900','1950','1999','2050'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#7ee5e5',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: '#f77eb9',
      backgroundColor: 'rgba(0,0,0,0)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];



  /**
   * Doughnut chart
   */
  public doughnutChartLabels: Label[] = ["Africa", "Asia", "Europe"];
  public doughnutChartData: SingleDataSet = [2478,4267,1334];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    { backgroundColor: ["#7ee5e5","#f77eb9","#4d8af0"] }
  ];



  /**
   * Area chart
   */
  public areaChartData: ChartDataSets[] = [
    { data: [86,114,106,106,107,111,133,221,783,2478], label: 'Africa', fill: true },
    { data: [282,350,411,502,635,809,947,1402,3700,5267], label: 'Asia', fill: true }
  ];
  public areaChartLabels: Label[] = ['1500','1600','1700','1750','1800','1850','1900','1950','1999','2050'];
  public areaChartOptions: ChartOptions = {
    responsive: true,
  };
  public areaChartColors: Color[] = [
    {
      borderColor: '#7ee5e5',
      backgroundColor: '#c2fdfd',
    },
    {
      borderColor: '#f77eb9',
      backgroundColor: '#ffbedd',
    }
  ];
  public areaChartLegend = true;
  public areaChartType: ChartType = 'line';
  public areaChartPlugins = [];



  /**
   * Doughnut chart
   */
  public pieChartLabels: Label[] = ["Africa", "Asia", "Europe"];
  public pieChartData: SingleDataSet = [2478,4267,1334];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Color[] = [
    { backgroundColor: ["#7ee5e5","#f77eb9","#4d8af0"] }
  ];



  /**
   * Bubble chart
   */
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "GDP (PPP)"
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Happiness"
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  public bubbleChartData: ChartDataSets[] = [
    {
      label: "China",
      backgroundColor: "#c2fdfd",
      borderColor: "#7ee5e5",
      data: [{
        x: 21269017,
        y: 5.245,
        r: 15
      }]
    }, {
      label: "Denmark",
      backgroundColor: "#ffbedd",
      borderColor: "#f77eb9",
      data: [{
        x: 258702,
        y: 7.526,
        r: 10
      }]
    }, {
      label: "Germany",
      backgroundColor: "#bbd4ff",
      borderColor: "#4d8af0",
      data: [{
        x: 3979083,
        y: 6.994,
        r: 15
      }]
    }, {
      label: "Japan",
      backgroundColor: "#ffe69d",
      borderColor: "#fbbc06",
      data: [{
        x: 4931877,
        y: 5.921,
        r: 15
      }]
    }
  ];



  /**
   * Radar chart
   */
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ["Africa", "Asia", "Europe", "Latin America", "North America"];

  public radarChartData: ChartDataSets[] = [
    {
      label: "1950",
      fill: true,
      backgroundColor: "#ffbedd",
      borderColor: "#f77eb9",
      pointBorderColor: "#f77eb9",
      pointBackgroundColor: "#ffbedd",
      data: [8.77,55.61,21.69,6.62,6.82]
    }, {
      label: "2050",
      fill: true,
      backgroundColor: "#c2fdfd",
      borderColor: "#7ee5e5",
      pointBorderColor: "#7ee5e5",
      pointBackgroundColor: "#c2fdfd",
      data: [25.48,54.16,7.61,8.06,4.45]
    }
  ];
  public radarChartType: ChartType = 'radar';



  /**
   * Polar area chart
   */
  public polarAreaChartLabels: Label[] = ["Africa", "Asia", "Europe", "Latin America"];
  public polarAreaChartData: SingleDataSet = [2478,5267,734,784]
  public polarAreaChartColors: Color[] = [
    {
      backgroundColor: ["#f77eb9", "#7ee5e5","#4d8af0","#fbbc06"],
    }
  ];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';



  /**
   * Grouped bar chart
   */
  public groupedBarChartOptions: ChartOptions = {
    responsive: true,
  };
  public groupedBarChartLabels: Label[] = ["1900", "1950", "1999", "2050"];
  public groupedBarChartType: ChartType = 'bar';
  public groupedBarChartData: ChartDataSets[] = [
    {
      label: "Africa",
      backgroundColor: "#f77eb9",
      data: [133,221,783,2478]
    }, {
      label: "Europe",
      backgroundColor: "#7ee5e5",
      data: [408,547,675,734]
    }
  ];



  /**
   * Mixed chart
   */
  public mixedChartOptions: ChartOptions = {
    responsive: true,
  };
  public mixedChartLabels: Label[] = ["1900", "1950", "1999", "2050"];
  public mixedChartType: ChartType = 'bar';
  public mixedChartColors: Color[] = [
    { 
      backgroundColor: "rgba(0,0,0,0)",
      borderColor:  "#66d1d1"
    },
    {
      backgroundColor: "rgba(0,0,0,0)",
      borderColor:  "#ff3366"
    },
    {
      backgroundColor: "#f77eb9"
    },
    {
      backgroundColor: "#7ee5e5"
    }
  ];
  public mixedChartData: ChartDataSets[] = [
    {
      label: "Europe",
      data: [408,547,675,734],
      type: 'line'
    }, {
      label: "Africa",
      data: [133,221,783,2478],
      type: 'line'
    }, {
      label: "Europe",
      data: [408,547,675,734],
    }, {
      label: "Africa",
      data: [133,221,783,2478]
    }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
