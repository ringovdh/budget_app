import {Component} from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";
import {TxPerYearGroupDetails} from "../model/TxPerYearGroupDetails";


@Component({
  selector: 'app-transaction-per-year',
  templateUrl: './transaction-per-year.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [TransactionPipe]
})
export class TransactionPerYearComponent extends TransactionListComponent {

  txPerYearGroupDetails: TxPerYearGroupDetails;
  year = 0;


  ngOnInit() {
    super.ngOnInit();
    this.txPerYearGroupDetails = new TxPerYearGroupDetails()
  }

  changeYear(selected_year) {
    this.year = selected_year;
    this.txPerYearGroupDetails.resetAmounts();
    this.groupAndCalculateTransactions();
  }

  private groupAndCalculateTransactions() {
    let filteredTransactions = this.filterBySelection(0, 0, this.year)
    this.txPerYearGroupDetails.groupAndCalculateTransactions(filteredTransactions);
  }
}
