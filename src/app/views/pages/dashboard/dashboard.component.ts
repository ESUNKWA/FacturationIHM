import { Component, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

// Ng2-charts
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

// Progressbar.js
import ProgressBar from 'progressbar.js';

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
   * Apex chart
   */
  public apexChart1Options: Partial<apexChartOptions>;
  public apexChart2Options: Partial<apexChartOptions>;
  public apexChart3Options: Partial<apexChartOptions>;
  public apexChart4Options: Partial<apexChartOptions>;

  /**
   * NgbDatepicker
   */
  currentDate: NgbDateStruct;

  /**
   * Ng2 Bar Chart 1
   */
  public ng2BarChart1Options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#8392a5',
          fontSize: 10
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(77, 138, 240, .1)'
        },
        ticks: {
          fontColor: '#8392a5',
          fontSize: 10,
          min: 80,
          max: 200
        }
      }]
    }
  };
  public ng2BarChart1Labels: Label[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  public ng2BarChart1Type: ChartType = 'bar';
  public ng2BarChart1Colors: Color[] = [ { backgroundColor: "#727cf5" } ]
  public ng2BarChart1Legend = false;
  public ng2BarChart1Data: ChartDataSets[] = [
    { data: [150,110,90,115,125,160,190,140,100,110,120,120], label: 'Sales', categoryPercentage: .6, barPercentage: .3 }
  ];



  constructor(private calendar: NgbCalendar) {

    /**
     * ApexChart1 options
     */
    this.apexChart1Options = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
          data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
      }],
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: (e) => {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };



    /**
     * ApexChart2 options
     */
    this.apexChart2Options = {
      chart: {
        type: "bar",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "60%"
        }
      },
      colors: ["#727cf5"],
      series: [{
        data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63]
      }],
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      xaxis: {
        crosshairs: {
          width: 1
        }
      },
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: (e) => {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };



    /**
     * ApexChart3 options
     */
    this.apexChart3Options = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
          data: [41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89]
      }],
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: (e) => {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };



    /**
     * ApexChart4 options
     */
    this.apexChart4Options = {
      chart: {
        type: "line",
        height: 350,
        sparkline: {
          // enabled: !0
        },
        toolbar: {
          show: false
        }
      },
      series: [{
        data: [
          49.3,
          48.7,
          50.6,
          53.3,
          54.7,
          53.8,
          54.6,
          56.7,
          56.9,
          56.1,
          56.5,
          60.3,
          58.7,
          61.4,
          61.1,
          58.5,
          54.7,
          52.0,
          51.0,
          47.4,
          48.5,
          48.9,
          53.5,
          50.2,
          46.2,
          48.6,
          51.7,
          51.3,
          50.2,
          54.6,
          52.4,
          53.0,
          57.0,
          52.9,
          48.7,
          52.6,
          53.5,
          58.5,
          55.1,
          58.0,
          61.3,
          57.7,
          60.2,
          61.0,
          57.7,
          56.8,
          58.9,
          62.4,
          58.7,
          58.4,
          56.7,
          52.7,
          52.3,
          50.5,
          55.4,
          50.4,
          52.4,
          48.7,
          47.4,
          43.3,
          38.9,
          34.7,
          31.0,
          32.6,
          36.8,
          35.8,
          32.7,
          33.2,
          30.8,
          28.6,
          28.4,
          27.7,
          27.7,
          25.9,
          24.3,
          21.9,
          22.0,
          23.5,
          27.3,
          30.2,
          27.2,
          29.9,
          25.1,
          23.0,
          23.7,
          23.4,
          27.9,
          23.2,
          23.9,
          19.2,
          15.1,
          15.0,
          11.0,
          9.20,
          7.47,
          11.6,
          15.7,
          13.9,
          12.5,
          13.5,
          15.0,
          13.9,
          13.2,
          18.1,
          20.6,
          21.0,
          25.3,
          25.3,
          20.9,
          18.7,
          15.3,
          14.5,
          17.9,
          15.9,
          16.3,
          14.1,
          12.1,
          14.8,
          17.2,
          17.7,
          14.0,
          18.6,
          18.4,
          22.6,
          25.0,
          28.1,
          28.0,
          24.1,
          24.2,
          28.2,
          26.2,
          29.3,
          26.0,
          23.9,
          28.8,
          25.1,
          21.7,
          23.0,
          20.7,
          29.7,
          30.2,
          32.5,
          31.4,
          33.6,
          30.0,
          34.2,
          36.9,
          35.5,
          34.7,
          36.9
        ]
      }],
      stroke: {
        width: 2,
        curve: "straight"
      },
      markers: {
        size: 0
      },
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: -10
        }
      },
      xaxis: {
        categories: ["Jan","","","","","","","","","","","","","","","","Feb","","","","","","","","","","","","","","","","Mar","","","","","","","","","","","","","","","","Apr","","","","","","","","","","","","","","","","May","","","","","","","","","","","","","","","","Jun","","","","","","","","","","","","","","","","Jul","","","","","","","","","","","","","","","","Aug","","","","","","","","","","","","","","","","Sep","","","","","","","","","","","","","","","","Oct","","","","",""],
        labels: {
          style: {
            colors: '#686868',
            fontSize: '13px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#686868',
            fontSize: '11px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          }
        },
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };


  }

  ngOnInit(): void {
    this.currentDate = this.calendar.getToday();

    /**
     * Progressbar1 initialization
     */
    var progressbar1 = new ProgressBar.Circle('#progressbar1', {
      color: '#727cf5',
      trailColor: 'rgba(77, 138, 240, .1)',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#727cf5', width: 1 },
      to: { color: '#727cf5', width: 4 },
      // Set default step function for all animate calls
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }
    
      }
    });
    progressbar1.text.style.fontFamily = "'Overpass', sans-serif;";
    progressbar1.text.style.fontSize = '3rem';
    progressbar1.animate(.78);


  }

}
