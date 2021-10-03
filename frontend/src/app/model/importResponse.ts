import {Transaction} from "./transaction";

export class ImportResponse {
  transactionPeriodDate: string
  filteredTransactions: Transaction[]
  saldo: number
}
