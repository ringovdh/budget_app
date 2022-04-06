import {Component} from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";
import {TxPerYearGroupDetails} from "../model/TxPerYearGroupDetails";
import {TransactionService} from "../../../service/transaction-service";
import {Transaction} from "../../../model/transaction";


@Component({
  selector: 'app-transaction-per-year',
  templateUrl: './transaction-per-year.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [TransactionPipe]
})
export class TransactionPerYearComponent extends TransactionListComponent {

  txPerYearGroupDetails: TxPerYearGroupDetails;
  year = 0;
  yearTransactions: Transaction[];


  ngOnInit() {
    //super.ngOnInit();
    this.txPerYearGroupDetails = new TxPerYearGroupDetails()
  }

  changeYear(selected_year) {
    this.year = selected_year;
    this.txPerYearGroupDetails.resetAmounts();
    this.transactionService.findPerYear(this.year).subscribe(data => {
      this.txPerYearGroupDetails.groupAndCalculateTransactions(data);
    });

  }

}
