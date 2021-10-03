import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ImportComponent } from './components/import/import.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { AddCommentComponent } from './components/comment/add-comment/add-comment.component';
import { EditCommentComponent } from './components/comment/edit-comment/edit-comment.component';
import { TransactionModule } from './components/transaction/transaction.module';
import { registerLocaleData } from '@angular/common';
import localeBE from '@angular/common/locales/be';
import { TransactionOverviewComponent } from './components/transaction/transaction-overview/transaction-overview.component';
import { TransactionPerCategoryComponent } from './components/transaction/transaction-per-category/transaction-per-category.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ImportComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CommentListComponent,
    AddCommentComponent,
    EditCommentComponent,
    TransactionOverviewComponent,
    TransactionPerCategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TransactionModule,
    AppRoutingModule,
    NgxPaginationModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {


}

registerLocaleData(localeBE, 'be');
