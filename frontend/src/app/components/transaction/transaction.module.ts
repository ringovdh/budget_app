import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionPerMonthGraphComponent } from './transaction-graph/transaction-per-month/transaction-per-month-graph.component';
import { TransactionPerYearGraphComponent } from './transaction-graph/transaction-per-year/transaction-per-year-graph.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionPipe } from '../category/transaction.pipe';
import { TransactionPerMonthComponent } from './transaction-per-month/transaction-per-month.component';
import { TransactionPerYearComponent } from './transaction-per-year/transaction-per-year.component';
import { TransactionPerCategoryGraphComponent } from './transaction-graph/transaction-per-category/transaction-per-category-graph.component';
import { SavingGraphComponent } from './../saving/saving-graph/saving-graph.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionPerMonthGraphComponent,
    TransactionPerYearGraphComponent,
    AddTransactionComponent,
    TransactionPipe,
    TransactionPerMonthComponent,
    TransactionPerYearComponent,
    TransactionPerCategoryGraphComponent,
    SavingGraphComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule
    ],
  exports: [
    TransactionPerMonthGraphComponent,
    TransactionPerYearGraphComponent,
    TransactionListComponent,
    TransactionPerYearComponent,
    TransactionPerMonthComponent,
    TransactionPerCategoryGraphComponent,
    SavingGraphComponent
  ],
  entryComponents: [
    AddTransactionComponent
  ]
})
export class TransactionModule { }
