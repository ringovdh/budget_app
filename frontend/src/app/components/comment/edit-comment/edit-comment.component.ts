import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../service/comment-service';
import { CategoryService } from '../../../service/category-service';
import { Comment } from '../../../model/comment';
import { Category } from '../../../model/category';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['../../../../assets/modal_form_layout.css']
})
export class EditCommentComponent implements OnInit {

  comment: Comment;
  categories: Category[];


  constructor(private activeModal: NgbActiveModal,
              private commentService: CommentService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
  }

  closeAndSave() {
    this.commentService.saveComment(this.comment).subscribe();
    this.activeModal.close(this.comment);
  }



}
