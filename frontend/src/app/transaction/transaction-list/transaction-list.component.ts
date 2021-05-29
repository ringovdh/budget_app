import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionPipe} from '../../category/transaction.pipe';
import { TransactionService } from '../../service/transaction-service';
import { CategoryService } from '../../service/category-service';
import { Transaction } from '../../model/transaction';
import { Category } from '../../model/category';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  providers: [ TransactionPipe ]
})
export class TransactionListComponent implements OnInit {

  tx: Transaction;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  categories: Category[];
  submitted = false;
  category = 0;
  year = 0;
  month = 0;
  totalPositive = 0.0;
  totalNegative = 0.0;
  avgPositive = 0.0;
  avgNegative = 0.0;

  constructor (private transactionService: TransactionService,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private transactionPipe: TransactionPipe ) {

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

  changeCategory(selected_category) {
    this.category = selected_category;
    this.handleSelection();
  }
  changeYear(selected_year){
    this.year = selected_year;
    this.handleSelection();
  }
  changeMonth(selected_month){
    this.month = selected_month
    this.handleSelection();
  }

  openFormModal(tx) {
    this.tx = tx;
    const modalRef = this.modalService.open(AddTransactionComponent, { size: 'lg' });
    modalRef.componentInstance.tx = this.tx;
    modalRef.componentInstance.searchterm = "";
    modalRef.componentInstance.searchterm_check = false;
    modalRef.result.then((result) => {
      if (result) {
        let index = this.transactions.indexOf(result);
        this.transactions.splice(index,1);
        this.submitted = true;
      }
    });
  }

  private handleSelection(){
    this.filteredTransactions = this.transactionPipe.transform(this.transactions, this.category, this.year, this.month) ;
    this.calculateAmounts();
  }

  private calculateAmounts() {
    let _totalNegative = 0;
    let _totalPositive = 0
    let _countNegative = 0;
    let _countPositive = 0;
    this.filteredTransactions.forEach(function(transaction) {
      if (transaction.sign == '-') {
        _totalNegative =  _totalNegative + transaction.amount;
        _countNegative ++;
      } else {
        _totalPositive = _totalPositive + transaction.amount;
        _countPositive ++;
      }
    });
    this.avgNegative = 0;
    this.avgPositive = 0;
    this.totalNegative = _totalNegative;
    this.totalPositive = _totalPositive;
    if (_countNegative > 0) {
      this.avgNegative = _totalNegative / _countNegative;
    }
    if (_countPositive > 0) {
      this.avgPositive = _totalPositive / _countPositive;
    }
  }
}
