import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ImportComponent } from './import/import.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { AddCommentComponent } from './comment/add-comment/add-comment.component';
import { EditCommentComponent } from './comment/edit-comment/edit-comment.component';
import { TransactionModule } from './transaction/transaction.module';
import { registerLocaleData } from '@angular/common';
import localeBE from '@angular/common/locales/be';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TransactionModule,
    AppRoutingModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {


}

registerLocaleData(localeBE, 'be');
