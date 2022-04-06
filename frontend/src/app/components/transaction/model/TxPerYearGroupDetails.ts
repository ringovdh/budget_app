import {TxGroupDetails} from "./TxGroupDetails";
import {Transaction} from "../../../model/transaction";

export class TxPerYearGroupDetails {

  groups: Map<string, TxGroupDetails>;
  totalNegative = 0;
  totalPositive = 0;
  restSaldo = 0;
  savings = 0;
  currentYearSaldoStatus = "fa fa-equals";

  public resetAmounts() {
    this.totalNegative = 0;
    this.totalPositive = 0;
    this.restSaldo = 0;
    this.savings = 0;
  }

  groupAndCalculateTransactions(filteredTransactions: Transaction[]) {
    this.groupByCategory(filteredTransactions);
    this.calculateDetailsPerGroup();
    this.calculateYearGroupDetails()
  }

  private groupByCategory(transactions: Transaction[]) {
    let groups: Map<string, TxGroupDetails> = new Map<string, TxGroupDetails>();
    transactions.forEach((transaction) => {
      let _cat = transaction.category.label;

      if (groups.has(_cat)) {
        groups.get(_cat).transactions.push(transaction);
      } else {
        let groupDetails = new TxGroupDetails(transaction, transaction.category);
        groups.set(_cat, groupDetails);
      }
    });

    this.groups = groups;
  }

  private calculateDetailsPerGroup() {
    let groupDetails: TxGroupDetails;

    this.groups.forEach((value: TxGroupDetails, key: string) => {
      groupDetails = this.groups.get(key);
      groupDetails.calculateAmounts();
    });
  }

  private calculateYearGroupDetails() {
    let _savings = 0;
    let _nosavings = 0;

    this.groups.forEach((value: TxGroupDetails, key: string) => {
      if (value.category.indetails) {
        this.totalPositive = this.totalPositive + value.totalPositive;
        this.totalNegative = this.totalNegative + value.totalNegative;
      }
      if (value.category.label === 'Sparen') {
        _savings = value.totalAmount;
      }
      if (value.category.label === 'Easy Save') {
        _savings = value.totalAmount;
      }
      if (value.category.label === 'Opname spaargeld') {
        _nosavings = value.totalAmount;
      }
    });
    this.restSaldo = this.totalPositive - this.totalNegative;
    this.calculateSavings(_savings, _nosavings);
    if (this.restSaldo < 0) {
      this.currentYearSaldoStatus = "fa fa-thumbs-down";
    }
    if (this.restSaldo > 0) {
      this.currentYearSaldoStatus = "fa fa-thumbs-up";
    }
  }

  private calculateSavings(savings, nosavings) {
    let _savings = -(savings + nosavings);
    if (_savings < 0) {
      this.savings = 0;
    } else {
      this.savings = _savings;
    }
  }
}
