import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionOverviewComponent } from './components/transaction/transaction-overview/transaction-overview.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { AddCommentComponent } from './components/comment/add-comment/add-comment.component'
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCommentComponent } from './components/comment/edit-comment/edit-comment.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddTransactionComponent } from './components/transaction/add-transaction/add-transaction.component'
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionOverviewComponent },
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
