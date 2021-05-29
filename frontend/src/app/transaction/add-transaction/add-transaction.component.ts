import { Component, OnInit} from '@angular/core';
import { TransactionService } from '../../service/transaction-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../model/category';
import { Comment } from '../../model/comment';
import { CategoryService } from '../../service/category-service';
import { CommentService } from '../../service/comment-service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  categories: Category[];
  comments: Comment[];
  comment: Comment;

  constructor(private activeModal: NgbActiveModal,
    private transactionService: TransactionService,
    private categoryService:CategoryService,
    private commentService:CommentService) {

  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
    this.commentService.findAll().subscribe(data => {
      this.comments = data;
    });
  }

  closeAndSave(tx, searchterm, searchterm_check) {

    if (searchterm_check) {
      console.log(searchterm_check + ' : ' + searchterm)
      this.comment = new Comment();
      this.comment.searchterm = searchterm;
      this.comment.replacement = tx.comment;
      this.comment.category = tx.category;
      console.log(this.comment)
      this.commentService.saveComment(this.comment).subscribe();
    }
    this.transactionService.saveTransaction(tx).subscribe();
    this.activeModal.close(tx);
  }
}
