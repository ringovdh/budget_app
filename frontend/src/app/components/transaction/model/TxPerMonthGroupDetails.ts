import {TxGroupDetails} from "./TxGroupDetails";
import {CategoryBudget} from "./CategoryBudget";

export class TxPerMonthGroupDetails {

  formattedMonth: string;
  groups: Map<string, TxGroupDetails>;
  categoryBudgets: CategoryBudget[];
  totalNegative = 0;
  totalPositive = 0;
  restSaldo = 0;
  fixedCost = 0;
  savings = 0;
  currentMonthSaldoStatus = "fa fa-equals";

  public resetAmounts() {
    this.totalNegative = 0;
    this.totalPositive = 0;
    this.restSaldo = 0;
    this.fixedCost = 0;
    this.savings = 0;
  }

  public setFormattedMont(year, month) {
    if (year == 0) {
      this.formattedMonth = month;
    } else {
      this.formattedMonth = month + '/' + year;
    }
  }

  public groupAndCalculateTransactions(filteredTransactions) {
    this.groupByCategory(filteredTransactions);
    this.calculateDetailsPerGroup();
    this.calculateMonthGroupDetails();
    this.calculateCategoryBudget();
  }

  private calculateDetailsPerGroup() {
    let groupDetails: TxGroupDetails;

    this.groups.forEach((value: TxGroupDetails, key: string) => {
      groupDetails = this.groups.get(key);
      groupDetails.calculateAmounts();
    });
  }

  public calculateCategoryBudget() {
    let groupDetails: TxGroupDetails;
    this.categoryBudgets = [];

    this.groups.forEach((value: TxGroupDetails, key: string) => {

      if (value.category.inmonitor) {
        groupDetails = this.groups.get(key);
        let categoryBudget = new CategoryBudget();
        categoryBudget.total = Math.abs(groupDetails.totalAmount);
        categoryBudget.limit = groupDetails.category.limitamount;
        this.countLimitSaldo(categoryBudget)
        categoryBudget.categoryLabel = groupDetails.category.label;
        this.categoryBudgets.push(categoryBudget);
      }
    });
  }

  private countLimitSaldo(categoryBudget: CategoryBudget) {
    categoryBudget.saldo = categoryBudget.limit - categoryBudget.total
    if (categoryBudget.saldo < 0) {
      categoryBudget.stateColor = '#e2144e'
    } else {
      categoryBudget.stateColor = '#c7e214'
    }

  }

  private calculateMonthGroupDetails() {
    let _savings = 0;
    let _nosavings = 0;
    this.groups.forEach((value: TxGroupDetails) => {
      if (value.category.indetails) {
        this.totalPositive = this.totalPositive + value.totalPositive;
        this.totalNegative = this.totalNegative + value.totalNegative;
        this.fixedCost = this.fixedCost + value.fixedCost;
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

  private groupByCategory(transactions) {
    let groups: Map<string, TxGroupDetails> = new Map<string, TxGroupDetails>();
    console.log("maand")
    console.log(transactions)
    transactions.forEach((transaction) => {
      let _cat = transaction.category;
      let _catLimit = _cat.limitamount;
      let _categoryLabel = _cat.label
      if (groups.has(_categoryLabel)) {
        groups.get(_cat.label).transactions.push(transaction);
      } else {
        let groupDetails = new TxGroupDetails(transaction, _catLimit);
        groupDetails.category = _cat;
        groups.set(_categoryLabel, groupDetails);
      }
    });

    this.groups = groups;
  }

}
