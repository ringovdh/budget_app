import {Component, Input, OnChanges} from '@angular/core';
import {Transaction} from "../../../../model/transaction";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-transaction-per-category-graph',
  templateUrl: './transaction-per-category-graph.component.html',
  styleUrls: ['./transaction-per-category-graph.component.css']
})
export class TransactionPerCategoryGraphComponent implements OnChanges {

  @Input() transactions: Transaction[];
  linechart: Chart;

  constructor() { }

  ngOnChanges() {
    let periods = new Array();
    let amounts = new Array();

    if (this.transactions != null) {
      const groups = this.groupAndCountPerMonth();

      for (const key in groups) {
        periods.push(key)
        amounts.push(groups[key])
      }
      if (this.linechart != null) {
        this.linechart.destroy();
      }
      this.linechart = new Chart('lineChartCategories', {
        type: 'line', data: {
          labels: periods,
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

  public groupAndCountPerMonth() {
    var group = new Array();
    this.transactions.forEach(function(transaction) {
      var month = new Date(transaction.date).getMonth()+1;
      var year = new Date(transaction.date).getFullYear();
      var period = month +'/'+year;
      //TODO remove hardcoded id's!
      if (transaction.category.id != 44 && transaction.category.id != 27 && transaction.category.id != 26) {
        if (period in group) {
          if (transaction.sign == '-') {
            group[period] = group[period] - transaction.amount;
          } else {
            group[period] = group[period] + transaction.amount;
          }
        } else {
          if (transaction.sign == '-') {
            group[period] = 0-transaction.amount;
          } else {
            group[period] = transaction.amount;
          }
        }
      }
    });

    return group;
  }

}
