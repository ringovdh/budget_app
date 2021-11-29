import { Component, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import {TxGroupDetails} from "../../model/TxGroupDetails";

@Component({
  selector: 'app-transaction-per-month-graph',
  templateUrl: './transaction-per-month-graph.component.html',
  styleUrls: ['./transaction-per-month-graph.component.css']
})
export class TransactionPerMonthGraphComponent implements OnChanges {

  @Input() details: Map<string,TxGroupDetails>;
  pieChart: Chart;

  constructor() { }

  ngOnChanges() {

    if (this.details != null) {

      let periods = [];
      let amounts = [];
      let backgroundColors = [];
      this.details.forEach((value:TxGroupDetails, key:string) => {
        if (value.inDetails) {
          periods.push(key);
          amounts.push(value.totalAmount);
          backgroundColors.push(value.backgroundColor);
        }
      });

      if (this.pieChart != null) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart('pieChartMonths', {
        type: 'pie', data: {
          labels: periods,
          datasets: [
            { data: amounts,
              borderColor: '#303e45',
              backgroundColor: backgroundColors,
            }
          ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: false
              }],
            }
          }
        });
    }
  }
}
