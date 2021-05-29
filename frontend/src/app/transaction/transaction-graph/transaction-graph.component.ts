import { Component, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.css']
})
export class TransactionGraphComponent implements OnChanges {

  @Input() transactions: Transaction[];
  amount = [];
  period = [];
  linechart = [];

  constructor() { }

  ngOnChanges() {
    this.period = [];
    this.amount = [];
    if (this.transactions != null) {
      var groups = this.groupAndCountPerMonth();
      for (var key in groups) {
        this.period.push(key)
        this.amount.push(groups[key])
      }
      this.linechart = new Chart('canvas', {
        type: 'line', data: {
          labels: this.period,
          datasets: [
            { data: this.amount,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
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
      if (transaction.category != 44 && transaction.category != 27 && transaction.category != 26) {
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
