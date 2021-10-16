import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../model/transaction';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  transform(transactions: Transaction[], category_id: number, year: number, month: number): Transaction[] {

    if (!transactions) {
      return null;
    }
    if (!category_id && !year && !month) {
      return null;
    }
    if (category_id && category_id != 0) {
      transactions = transactions.filter(tx=>tx.category.id == category_id);
    }
    if (year && year != 0) {
      transactions = transactions.filter(tx=> new Date(tx.date).getFullYear() == year);
    }
    if (month && month != 0) {
      transactions = transactions.filter(tx=> new Date(tx.date).getMonth()+1 == month);
    }

    return transactions;
  }

  filtersavings(transactions: Transaction[], year: number) {

    if (!transactions) {
      return null;
    }

    if (year && year != 0) {
      transactions = transactions.filter(tx=> new Date(tx.date).getFullYear() == year);
    }
    transactions = transactions.filter(tx=>tx.category.id == 44 || tx.category.id == 26 || tx.category.id == 27);

    return transactions
  }

}
