import {Transaction} from "../../../model/transaction";

export class TxGroupDetails {

  transactions = [];
  totalNegative = 0;
  totalPositive = 0;
  average = 0;

  constructor(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  public calculateAmounts() {

    let _totalNegative = 0;
    let _totalPositive = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.sign == '-') {
        _totalNegative = _totalNegative + transaction.amount;
      } else {
        _totalPositive = _totalPositive + transaction.amount;
      }
    });

    this.totalNegative = _totalNegative;
    this.totalPositive = _totalPositive;
  }


  public getTotalAmount() {
    return this.totalPositive - this.totalNegative;
  }


}
