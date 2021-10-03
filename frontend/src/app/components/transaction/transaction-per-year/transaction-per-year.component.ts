import { Component } from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";

@Component({
  selector: 'app-transaction-per-year',
  templateUrl: './transaction-per-year.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [ TransactionPipe ]
})
export class TransactionPerYearComponent extends TransactionListComponent {

  year = 0;

  changeYear(selected_year){
    this.year = selected_year;
    this.handleSelection();
  }

}
