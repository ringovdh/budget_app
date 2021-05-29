import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionGraphComponent } from './transaction-graph/transaction-graph.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionPipe } from '../category/transaction.pipe';


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionGraphComponent,
    AddTransactionComponent,
    TransactionPipe,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    AddTransactionComponent
  ]
})
export class TransactionModule { }
