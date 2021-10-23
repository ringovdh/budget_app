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
      let categories = [];
      let amounts = [];
      let backgroundColors = [];
      const groups = this.groupAndCountPerCategory();

      for (const key in groups) {
        categories.push(key)
        amounts.push(groups[key][1])
        backgroundColors.push(groups[key][0])
      }

      if (this.pieChart != null) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart('pieChartMonths', {
        type: 'pie', data: {
          labels: categories,
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

  public groupAndCountPerCategory() {
    const group = new Array();
    this.transactions.forEach(function(transaction) {
      const cat = transaction.category;

      //TODO remove hardcoded id's!
      if (transaction.category.id != 44 && transaction.category.id != 27 && transaction.category.id != 26) {
        if (!(cat.label in group)) {
          if (transaction.sign == '-') {
            group[cat.label] = ['#28666e', 0-transaction.amount];
          } else {
            group[cat.label] = ['#fedc97', transaction.amount];
          }
        } else {
          if (transaction.sign == '-') {
            group[cat.label][1] = group[cat.label][1] - transaction.amount;
          } else {
            group[cat.label][1] = group[cat.label][1] + transaction.amount;
          }

        }
      }
    });

    return group;
  }

}
