import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../../service/transaction-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../../model/category';
import {Comment} from '../../../model/comment';
import {CategoryService} from '../../../service/category-service';
import {CommentService} from '../../../service/comment-service';
import {Transaction} from "../../../model/transaction";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['../../../../assets/modal_form_layout.css']
})
export class AddTransactionComponent implements OnInit {

  categories: Category[];
  comments: Comment[];
  comment: Comment;
  transaction: Transaction;
  searchterm_check: boolean;

  constructor(public activeModal: NgbActiveModal,
              private transactionService: TransactionService,
              private categoryService: CategoryService,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
    this.commentService.findAll().subscribe(data => {
      this.comments = data;
    });
  }

  closeAndSave() {
    this.transactionService.saveTransaction(this.transaction).subscribe();
    this.activeModal.close(this.transaction);
  }
}
