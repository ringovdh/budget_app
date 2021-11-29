import {Component, Input, OnChanges} from '@angular/core';
import { Chart } from 'chart.js';
import {Transaction} from "../../../../model/transaction";

@Component({
  selector: 'app-transaction-per-year-graph',
  templateUrl: './transaction-per-year-graph.component.html',
  styleUrls: ['./transaction-per-year-graph.component.css']
})
export class TransactionPerYearGraphComponent implements OnChanges {

  @Input() transactions: Transaction[];
  polarAreaChart: Chart;

  constructor() { }

  ngOnChanges() {
    if (this.transactions != null) {
      let amounts = new Array();
      let categories = new Array();
      const groups = this.groupAndCountPerCategory();

      for (const key in groups) {
        categories.push(key)
        amounts.push(groups[key])
      }
      if (this.polarAreaChart != null) {
        this.polarAreaChart.destroy();
      }
      this.polarAreaChart = new Chart('polarAreaChartYears', {
        type: 'bar', data: {
          labels: categories,
          datasets: [
            { data: amounts,
              borderColor: '#303e45',
              backgroundColor: "#7d97a5",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    }
  }

  public groupAndCountPerCategory() {
    const group = new Array();
    this.transactions.forEach(function(transaction) {
      const cat = transaction.category.label;

      //TODO remove hardcoded id's!
      if (transaction.category.id != 44 && transaction.category.id != 27 && transaction.category.id != 26) {
        if (cat in group) {
          if (transaction.sign == '-') {
            group[cat] = group[cat] - transaction.amount;
          } else {
            group[cat] = group[cat] + transaction.amount;
          }
        } else {
          if (transaction.sign == '-') {
            group[cat] = 0-transaction.amount;
          } else {
            group[cat] = transaction.amount;
          }
        }
      }
    });

    return group;
  }

}
