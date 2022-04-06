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
  positivePieChart: Chart;
  negativePieChart: Chart;

  constructor() {
  }

  ngOnChanges() {
    let positivePieChartAmounts = [];
    let positivePieChartCategories = [];
    let negativePieChartAmounts = [];
    let negativePieChartCategories = [];

    this.details.forEach((value: TxGroupDetails, key: string) => {

        if (value.totalAmount > 0 || value.category.label === 'Easy Save') {
            positivePieChartCategories.push(key);
            positivePieChartAmounts.push(value.totalAmount);
        } else {
          negativePieChartCategories.push(key);
          negativePieChartAmounts.push(value.totalAmount);
        }

    });

    if (this.positivePieChart != null) {
      this.positivePieChart.destroy();
    }
    if (this.negativePieChart != null) {
      this.negativePieChart.destroy();
    }

    this.positivePieChart = new Chart('positivePieChartYears', {
      type: 'pie', data: {
        labels: positivePieChartCategories,
        datasets: [
          {
            data: positivePieChartAmounts,
            borderColor: '#303e45',
            backgroundColor: "#7d97a5",
          }
        ]
      },
      options: {
        legend: {display: true},
        scales: {
          xAxes: [{display: false}],
          yAxes: [{display: false}],
        }
      }
    });
    this.negativePieChart = new Chart('negativePieChartYears', {
      type: 'pie', data: {
        labels: negativePieChartCategories,
        datasets: [
          {
            data: negativePieChartAmounts,
            borderColor: '#303e45',
            backgroundColor: "#7d97a5",
          }
        ]
      },
      options: {
        legend: {display: true},
        scales: {
          xAxes: [{display: false}],
          yAxes: [{display: false}],
        }
      }
    });
  }

}
