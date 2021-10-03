import { Component, OnInit } from '@angular/core';
import {TransactionListComponent} from "../transaction-list/transaction-list.component";
import {TransactionPipe} from "../../category/transaction.pipe";

@Component({
  selector: 'app-transaction-per-category',
  templateUrl: './transaction-per-category.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [ TransactionPipe ]
})
export class TransactionPerCategoryComponent extends TransactionListComponent {

}
