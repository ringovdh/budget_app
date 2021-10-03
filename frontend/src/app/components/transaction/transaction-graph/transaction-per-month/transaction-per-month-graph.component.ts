import { Component, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from '../../../../model/transaction';

@Component({
  selector: 'app-transaction-per-month-graph',
  templateUrl: './transaction-per-month-graph.component.html',
  styleUrls: ['./transaction-per-month-graph.component.css']
})
export class TransactionPerMonthGraphComponent implements OnChanges {

  @Input() transactions: Transaction[];
  pieChart: Chart;

  constructor() { }

  ngOnChanges() {

    if (this.transactions != null) {
      let categories = new Array();
      let amount = new Array();
      const groups = this.groupAndCountPerCategory();
      for (const key in groups) {
        categories.push(key)
        amount.push(groups[key])
      }
      if (this.pieChart != null) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart('pieChartMonths', {
        type: 'pie', data: {
          labels: categories,
          datasets: [
            { data: amount,
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
