import {Component} from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";
import {TxPerMonthGroupDetails} from "../model/TxPerMonthGroupDetails"

@Component({
  selector: 'app-transaction-per-month',
  templateUrl: './transaction-per-month.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [TransactionPipe]
})
export class TransactionPerMonthComponent extends TransactionListComponent {

  txPerMonthDetails: TxPerMonthGroupDetails;
  month = 0;
  year = 0;
  yearDisabled = true;


  ngOnInit() {
    super.ngOnInit();
    this.txPerMonthDetails = new TxPerMonthGroupDetails();
  }

  public changeMonth(selected_month) {
    this.month = selected_month;
    if (this.year != 0) {
      this.txPerMonthDetails.resetAmounts();
      this.txPerMonthDetails.setFormattedMont(this.year, this.month)
      this.transactionService.findByMonth(this.year, this.month).subscribe(data => {
        this.txPerMonthDetails.groupAndCalculateTransactions(data);
      });
    }
    this.yearDisabled = false;
  }

  public changeYear(selected_year) {
    this.year = selected_year;
    this.txPerMonthDetails.resetAmounts();
    this.txPerMonthDetails.setFormattedMont(this.year, this.month)
    this.transactionService.findByMonth(this.year, this.month).subscribe(data => {
      this.txPerMonthDetails.groupAndCalculateTransactions(data);
    });
  }

}
