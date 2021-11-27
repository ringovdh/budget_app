import {TxGroupDetails} from "./TxGroupDetails";

export class TxPerMonthGroupDetails {

  formattedMonth: string;
  groups: Map<string,TxGroupDetails>;
  totalNegative = 0;
  totalPositive = 0;
  restSaldo = 0;
  fixedCost = 0;
  currentMonthSaldoStatus = "fa fa-equals";

  public resetAmounts()
  {
    this.totalNegative = 0;
    this.totalPositive = 0;
    this.restSaldo = 0;
    this.fixedCost = 0;
  }

  public setFormattedMont(year, month)
  {
    if (year == 0) {
      this.formattedMonth = month;
    } else {
      this.formattedMonth = month + '/' + year;
    }
  }

  public groupAndCalculateTransactions(filteredTransactions)
  {
    this.groupByCategory(filteredTransactions);
    this.calculateDetailsPerGroup();
    this.calculateMonthGroupDetails()
  }

  private calculateDetailsPerGroup()
  {
    let groupDetails:TxGroupDetails;

    this.groups.forEach((value:TxGroupDetails, key:string) => {
      groupDetails = this.groups.get(key);
      groupDetails.calculateAmounts();
    });
  }

  private calculateMonthGroupDetails()
  {
    this.groups.forEach((value: TxGroupDetails) => {
      this.totalPositive = this.totalPositive + value.totalPositive;
      this.totalNegative = this.totalNegative + value.totalNegative;
      this.fixedCost = this.fixedCost + value.fixedCost;
    });
      this.restSaldo = this.totalPositive - this.totalNegative;

      if (this.restSaldo < 0) {
        this.currentMonthSaldoStatus = "fa fa-thumbs-down";
      }
      if (this.restSaldo > 0) {
        this.currentMonthSaldoStatus = "fa fa-thumbs-up";
      }
  }

  private groupByCategory(transactions)
  {
    let groups: Map<string,TxGroupDetails> = new Map<string,TxGroupDetails>();

    transactions.forEach ((transaction) => {
      let _cat = transaction.category;

      if (groups.has(_cat.label)) {
        groups.get(_cat.label).transactions.push(transaction);
      } else {
        let groupDetails = new TxGroupDetails(transaction);
        groups.set(_cat.label, groupDetails);
      }
    });

    this.groups = groups;
  }

}
