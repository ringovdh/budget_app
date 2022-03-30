import {Transaction} from "../../../model/transaction";
import {Category} from "../../../model/category";

export class TxGroupDetails {

  transactions = [];
  totalNegative = 0;
  totalPositive = 0;
  totalAmount = 0;
  fixedCost = 0;
  average = 0;
  category: Category;
  backgroundColor: string;

  constructor(transaction: Transaction, category: Category) {
    this.transactions.push(transaction);
    this.category = category;
  }

  public calculateAmounts() {
    let _totalNegative = 0;
    let _totalPositive = 0;
    let _fixedCost = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.sign == '-') {
        _totalNegative = _totalNegative + transaction.amount;
      } else {
        _totalPositive = _totalPositive + transaction.amount;
      }
      if (transaction.category.fixedcost) {
        _fixedCost = _fixedCost + transaction.amount;
      }
    });

    this.totalNegative = _totalNegative;
    this.totalPositive = _totalPositive;
    this.totalAmount = _totalPositive - _totalNegative;
    this.fixedCost = _fixedCost;
    this.backgroundColor = this.totalAmount < 0 ? '#28666e': '#fedc97';
  }

}
