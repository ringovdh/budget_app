import { Component } from '@angular/core';
import {TransactionListComponent} from "../../transaction/transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [ TransactionPipe ]
})
export class SavingComponent extends TransactionListComponent {

  totalSaved = 0.0;
  totalUsed = 0.0;
  totalEasySave = 0.0;
  totalAmount = 0.0;

  changeSavingsYear(selected_year){
    this.year = selected_year;
    this.filteredTransactions = this.transactionPipe.filtersavings(this.transactions, this.year)
    if (this.filteredTransactions != null) {
      this.importedFilteredTransactions = this.filteredTransactions;
      this.numberOfTransactions = this.filteredTransactions.length;
      this.calculateSavings();
    }
  }

  private calculateSavings() {
    let _totalSaved = 0;
    let _totalUsed = 0;
    let _totalEasySave = 0;

    this.filteredTransactions.forEach(function(transaction) {

      if (transaction.category.id == 44) {
        _totalEasySave = _totalEasySave + transaction.amount;
      }
      if (transaction.category.id == 26) {
        _totalUsed = _totalUsed + transaction.amount;
      }
      if (transaction.category.id == 27) {
        _totalSaved = _totalSaved + transaction.amount;
      }
    });

    this.totalEasySave = _totalEasySave;
    this.totalSaved = _totalSaved;
    this.totalUsed = _totalUsed;
    this.totalAmount = (_totalSaved + _totalEasySave) - _totalUsed;
  }
}
