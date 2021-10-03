import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../model/comment';
import { Category } from '../../../model/category';
import { CommentService } from '../../../service/comment-service';
import { CategoryService } from '../../../service/category-service';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['../../../../assets/modal_form_layout.css']
})
export class AddCommentComponent implements OnInit {

  comment: Comment;
  categories: Category[];

  constructor(private activeModal: NgbActiveModal,
              private commentService: CommentService,
              private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
        this.categories = data;
    });
    this.comment = new Comment();

  }

  closeAndSave() {
    this.commentService.saveComment(this.comment).subscribe();
    this.activeModal.close(this.comment);
  }
}
