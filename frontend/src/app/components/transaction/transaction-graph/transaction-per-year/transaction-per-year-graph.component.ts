import {Component, Input, OnChanges} from '@angular/core';
import {Chart} from 'chart.js';
import {TxGroupDetails} from "../../model/TxGroupDetails";

@Component({
  selector: 'app-transaction-per-year-graph',
  templateUrl: './transaction-per-year-graph.component.html',
  styleUrls: ['./transaction-per-year-graph.component.css']
})

export class TransactionPerYearGraphComponent implements OnChanges {

  @Input() details: Map<string, TxGroupDetails>;
  barChart: Chart;

  constructor() {
  }

  ngOnChanges() {
    let amounts = [];
    let periods = [];

    this.details.forEach((value: TxGroupDetails, key: string) => {
      if (value.category.indetails) {
        periods.push(key);
        amounts.push(value.totalAmount);
      }
    });

    if (this.barChart != null) {
      this.barChart.destroy();
    }

    this.barChart = new Chart('horizontalBarYears', {
      type: 'horizontalBar', data: {
        labels: periods,
        datasets: [
          {
            data: amounts,
            borderColor: '#303e45',
            backgroundColor: "#7d97a5",
          }
        ]
      },
      options: {
        legend: {display: false},
        scales: {
          xAxes: [{display: true}],
          yAxes: [{display: true}],
        }
      }
    });
  }

}
