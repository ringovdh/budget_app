import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { AddCommentComponent } from './comment/add-comment/add-comment.component'
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCommentComponent } from './comment/edit-comment/edit-comment.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component'
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'import', component: ImportComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'add-comment', component: AddCommentComponent },
  { path: 'edit-comment/:id', component: EditCommentComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent },
  { path: 'deleteCategory/:id', component: CategoryListComponent },
  { path: 'add-transaction/:id', component: AddTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
