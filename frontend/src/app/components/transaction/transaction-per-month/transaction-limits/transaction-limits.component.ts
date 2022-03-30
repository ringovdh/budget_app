import { Component, OnChanges, Input } from '@angular/core';
import {CategoryBudget} from "../../model/CategoryBudget";
import {TxPerMonthGroupDetails} from "../../model/TxPerMonthGroupDetails";

@Component({
  selector: 'app-transaction-limits',
  templateUrl: './transaction-limits.component.html',
  styleUrls: ['./transaction-limits.component.css']
})

export class TransactionLimitsComponent implements OnChanges {

  @Input() categoryBudgets: CategoryBudget[];

  constructor() {
  }

  ngOnChanges() {
  }
}
