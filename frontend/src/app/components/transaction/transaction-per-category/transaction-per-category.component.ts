import {Component} from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";
import {TxPerCategoryGroupDetails} from "../model/TxPerCategoryGroupDetails";


@Component({
  selector: 'app-transaction-per-category',
  templateUrl: './transaction-per-category.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [TransactionPipe]
})
export class TransactionPerCategoryComponent extends TransactionListComponent {

  txPerCategoryDetails: TxPerCategoryGroupDetails;
  category_id = 0;
  year = 0;
  yearDisabled = true;


  ngOnInit() {
    super.ngOnInit();
    this.txPerCategoryDetails = new TxPerCategoryGroupDetails();
  }

  public changeCategory(selected_category) {
    this.category_id = selected_category;
    this.txPerCategoryDetails.resetAmounts();
    this.txPerCategoryDetails.setCategoryLabel(this.categories, this.category_id);
    this.groupAndCalculateTransactions();
    this.yearDisabled = false;
  }

  public changeYear(selected_year) {
    this.year = selected_year;
    this.txPerCategoryDetails.resetAmounts();
    this.groupAndCalculateTransactions();
  }

  private groupAndCalculateTransactions() {
    let filteredTransactions = this.filterBySelection(this.category_id, 0, this.year)
    this.txPerCategoryDetails.groupAndCalculateTransactions(filteredTransactions);
  }
}
