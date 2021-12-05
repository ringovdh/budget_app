import {TxGroupDetails} from "./TxGroupDetails";

export class TxPerCategoryGroupDetails {

  category_label: string;
  groups: Map<string, TxGroupDetails>;
  totalNegative = 0;
  totalPositive = 0;
  currentMonthAvg = 0;
  currentMonthAvgStatus = "fa fa-equals";

  public resetAmounts() {
    this.totalNegative = 0;
    this.totalPositive = 0;
  }

  public setCategoryLabel(categories, category_id) {
    const _cat = categories.find(({id}) => id == category_id);
    this.category_label = _cat.label;
  }

  public groupAndCalculateTransactions(filteredTransactions) {
    this.groupByMonth(filteredTransactions);
    this.calculateDetailsPerGroup();
    this.calculateCategoryGroupDetails();
  }

  private calculateDetailsPerGroup() {
    let groupDetails: TxGroupDetails;

    this.groups.forEach((value: TxGroupDetails, key: string) => {
      groupDetails = this.groups.get(key);
      groupDetails.calculateAmounts();
    });
  }

  private calculateCategoryGroupDetails() {
    let _numberOfGroups = 0;
    let _totalAmount = 0;
    let _previousMonthAvg = 0;

    this.groups.forEach((value: TxGroupDetails, key: string) => {
      _numberOfGroups++;

      this.totalPositive = this.totalPositive + value.totalPositive;
      this.totalNegative = this.totalNegative + value.totalNegative;
      _totalAmount = _totalAmount + value.totalAmount;
      value.average = _totalAmount / _numberOfGroups;

      if (_numberOfGroups == this.groups.size - 1) {
        _previousMonthAvg = value.average;
      }

      if (_numberOfGroups == this.groups.size) {
        this.currentMonthAvg = value.average;
        if (_previousMonthAvg > this.currentMonthAvg) {
          this.currentMonthAvgStatus = "fa fa-thumbs-down";
        }
        if (_previousMonthAvg < this.currentMonthAvg) {
          this.currentMonthAvgStatus = "fa fa-thumbs-up";
        }
      }
    });
  }

  private groupByMonth(transactions) {
    let groups: Map<string, TxGroupDetails> = new Map<string, TxGroupDetails>();

    transactions.forEach((transaction) => {
      let _period = this.getPeriodLabel(transaction.date);
      let _inDetails = transaction.category.indetails;

      if (groups.has(_period)) {
        groups.get(_period).transactions.push(transaction);
      } else {
        let groupDetails = new TxGroupDetails(transaction, _inDetails, _period);
        groups.set(_period, groupDetails);
      }
    });

    this.groups = groups;
  }

  private getPeriodLabel(date: string) {
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    return month + '/' + year;
  }
}
