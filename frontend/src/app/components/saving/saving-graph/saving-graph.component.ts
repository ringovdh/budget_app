import {Component, Input, OnChanges} from '@angular/core';
import {Transaction} from "../../../model/transaction";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-saving-graph',
  templateUrl: './saving-graph.component.html',
  styleUrls: ['./saving-graph.component.css']
})
export class SavingGraphComponent implements OnChanges {

  @Input() transactions: Transaction[];
  barChart = Chart;
  labels = ['2016', "2017", "2018", "2019", "2020", "2021"];
  positiveGroup = [];
  negativegroup = [];
  savingLevels = [];


  constructor() { }

  ngOnChanges() {

    if (this.transactions != null) {
      this.groupSavingsPerYear();
      this.barChart = new Chart('barChartSavings', {
        type:'bar', data:{
          labels: this.labels,
          datasets: [
            { data: this.positiveGroup,
              borderColor: '#303e45',
              backgroundColor: "#7d97a5",
              label:'gespaard',
              fill: true
            },
            { data: this.negativegroup,
              borderColor: '#7d97a5',
              backgroundColor: '#303e45',
              label:'opgenomen',
              fill: true
            },
            { data: this.savingLevels,
              type:'line',
              tension:'0',
              borderColor: '#F2962F',
              backgroundColor: '#FFEACE',
              label:'bedrag'
            },
            ],
        },
        options: {
          legend: {
            display: true
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

  public groupSavingsPerYear() {

    let savings = [];
    let spendings = [];
    let startAmount = 6469.19;

    this.transactions.forEach(function (transaction) {
      let year = 'jaar ' + new Date(transaction.date).getFullYear();

      if (transaction.category.id == 44 || transaction.category.id == 27 || transaction.category.id == 26) {
          if (transaction.sign == '-') {
            if (year in savings) {
              savings[year] = savings[year] + transaction.amount;
            } else {
              savings[year] = transaction.amount;
            }
          } else {
            if (year in spendings) {
              spendings[year] = spendings[year] + transaction.amount;
            } else {
              spendings[year] = transaction.amount;
            }
          }
        }
    });

    for (const key in savings) {
      this.positiveGroup.push(savings[key]);
    }

    for (const key in spendings) {
      this.negativegroup.push(spendings[key]);
    }
    let amount = startAmount
    for (const key in savings) {
      amount += savings[key] - spendings[key];
      this.savingLevels.push(amount)
      console.log(amount);
    }

  }

}
