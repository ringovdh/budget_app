import { Component } from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";

@Component({
  selector: 'app-transaction-per-month',
  templateUrl: './transaction-per-month.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [ TransactionPipe ]
})
export class TransactionPerMonthComponent extends TransactionListComponent {

}
