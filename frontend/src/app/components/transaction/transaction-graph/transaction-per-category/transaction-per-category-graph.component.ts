import {Component, Input, OnChanges} from '@angular/core';
import { Chart } from 'chart.js';
import {TxGroupDetails} from "../../model/TxGroupDetails";
import {TxPerCategoryGroupDetails} from "../../model/TxPerCategoryGroupDetails";

@Component({
  selector: 'app-transaction-per-category-graph',
  templateUrl: './transaction-per-category-graph.component.html',
  styleUrls: ['./transaction-per-category-graph.component.css']
})
export class TransactionPerCategoryGraphComponent implements OnChanges {

  @Input() details: Map<string,TxGroupDetails>;
  lineChart: Chart;

  constructor() { }

  ngOnChanges() {
    console.log('yow')

    let periods = [];
    let amounts = [];
    let averages = [];
    console.log(this.details)
    this.details.forEach((value:TxGroupDetails, key:string) => {
      periods.push(key);
      amounts.push(value.getTotalAmount());
      averages.push(value.average)
    });
    if (this.lineChart != null) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart('lineChartCategories', {
      type: 'line',
      data: {
        labels: periods,
        datasets: [
          { data: amounts,
            borderColor: '#303e45',
            tension: 0
          },
          { data: averages,
            borderColor: '#F2962F',
            tension: 0
          }]
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
