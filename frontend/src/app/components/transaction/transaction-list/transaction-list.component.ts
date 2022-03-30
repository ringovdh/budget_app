import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransactionPipe} from '../../category/transaction.pipe';
import {TransactionService} from '../../../service/transaction-service';
import {CategoryService} from '../../../service/category-service';
import {Transaction} from '../../../model/transaction';
import {Category} from '../../../model/category';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {TxGroupDetails} from "../model/TxGroupDetails";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['../../../../assets/transaction_views.css'],
  providers: [TransactionPipe]
})
export class TransactionListComponent implements OnInit {

  @Input() filteredTransactions: Transaction[];
  @Input() importedFilteredTransactions: Transaction[];
  @Input() details: Map<string, TxGroupDetails>;
  transaction: Transaction;
  transactions: Transaction[];
  numberOfTransactions: number;
  p: number = 1;
  categories: Category[];
  submitted = false;

  year = 0;
  month = 0;
  totalPositive = 0.0;
  totalNegative = 0.0;
  avgPositive = 0.0;
  avgNegative = 0.0;
  fixedCost = 0.0;

  constructor(private transactionService: TransactionService,
              private modalService: NgbModal,
              private categoryService: CategoryService,
              protected transactionPipe: TransactionPipe) {
  }

  ngOnInit() {
    this.transactionService.findAll().subscribe(data => {
      this.transactions = data;
      if (this.transactions.length > 0) {
        this.handleSelection()
      }
    });
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
  }

  openEditTransactionForm(tx) {
    this.transaction = tx;
    const modalRef = this.modalService.open(AddTransactionComponent, {size: 'lg', windowClass: 'modal-transactions'});
    modalRef.componentInstance.transaction = this.transaction;
    modalRef.componentInstance.searchterm = "";
    modalRef.componentInstance.searchterm_check = false;
    modalRef.result.then((result) => {
      if (result) {
        let index = this.transactions.indexOf(result);
        this.transactions.splice(index, 1);
        this.submitted = true;
      }
    });
  }

  protected changeYear(selected_year) {
    this.year = selected_year;
    this.handleSelection();
  }


  protected filterBySelection(category_id, month, year) {
    return this.transactionPipe.transform(this.transactions, category_id, year, month);
  }

  protected handleSelection() {
    this.filteredTransactions = this.transactionPipe.transform(this.transactions, 0, this.year, this.month);
    if (this.filteredTransactions != null) {
      this.numberOfTransactions = this.filteredTransactions.length;
      this.calculateAmounts();
    }
  }

  private calculateAmounts() {
    let _totalNegative = 0;
    let _totalPositive = 0;
    let _countNegative = 0;
    let _countPositive = 0;
    let _fixedCost = 0;
    this.filteredTransactions.forEach(function (transaction) {
      if (transaction.sign == '-') {
        _totalNegative = _totalNegative + transaction.amount;
        _countNegative++;
      } else {
        _totalPositive = _totalPositive + transaction.amount;
        _countPositive++;
      }
      if (transaction.category.fixedcost) {
        _fixedCost = _fixedCost + transaction.amount;
      }
    });
    this.fixedCost = _fixedCost;
    this.totalNegative = _totalNegative;
    this.totalPositive = _totalPositive;
    if (_countNegative > 0) {
      this.avgNegative = _totalNegative / _countNegative;
    }
    if (_countPositive > 0) {
      this.avgPositive = _totalPositive / _countPositive;
    }
  }


  getAllTransactions() {
    let transactions = [];
    if (this.details) {
      this.details.forEach((value: TxGroupDetails) => {
        if (value.category.indetails) {
          transactions.push.apply(transactions, value.transactions);
        }
      });
      this.numberOfTransactions = transactions.length;
      return transactions;
    }
  }
}
