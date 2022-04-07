import {Transaction} from "./transaction";

export class ImportResponse {

  filteredTransactions: Transaction[]
  saldo: number
  availableBudget: number
  existingTransactions: Transaction[];
}
