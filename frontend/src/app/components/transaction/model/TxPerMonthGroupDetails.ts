import {TxGroupDetails} from "./TxGroupDetails";

export class TxPerMonthGroupDetails {

  formattedMonth: string;
  groups: Map<string,TxGroupDetails>;
  totalNegative = 0;
  totalPositive = 0;
  restSaldo = 0;
  fixedCost = 0;
  savings = 0;
  currentMonthSaldoStatus = "fa fa-equals";

  public resetAmounts()
  {
    this.totalNegative = 0;
    this.totalPositive = 0;
    this.restSaldo = 0;
    this.fixedCost = 0;
    this.savings = 0;
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
    let _savings = 0;
    let _nosavings = 0;
    this.groups.forEach((value: TxGroupDetails) => {
      if (value.inDetails) {
        this.totalPositive = this.totalPositive + value.totalPositive;
        this.totalNegative = this.totalNegative + value.totalNegative;
        this.fixedCost = this.fixedCost + value.fixedCost;
      }
      if (value.groupLabel === 'Sparen') {
        _savings = value.totalAmount;
        console.log('sparen: ')
        console.log(_savings)
      }
      if (value.groupLabel === 'Opname spaargeld') {
        _nosavings = value.totalAmount;
        console.log('opnemen: ')
        console.log(_nosavings)
      }
    });
      this.restSaldo = this.totalPositive - this.totalNegative;
      this.calculateSavings(_savings, _nosavings);
      if (this.restSaldo < 0) {
        this.currentMonthSaldoStatus = "fa fa-thumbs-down";
      }
      if (this.restSaldo > 0) {
        this.currentMonthSaldoStatus = "fa fa-thumbs-up";
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

  private groupByCategory(transactions)
  {
    let groups: Map<string,TxGroupDetails> = new Map<string,TxGroupDetails>();

    transactions.forEach ((transaction) => {
      let _cat = transaction.category;
      let _inDetails = _cat.indetails;
      let _categoryLabel = _cat.label
      if (groups.has(_categoryLabel)) {
        groups.get(_cat.label).transactions.push(transaction);
      } else {
        let groupDetails = new TxGroupDetails(transaction, _inDetails, _categoryLabel);
        groups.set(_categoryLabel, groupDetails);
      }
    });

    this.groups = groups;
  }

}
