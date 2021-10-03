import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from '../../../model/comment'
import { CommentService } from '../../../service/comment-service';
import { EditCommentComponent } from "../edit-comment/edit-comment.component";
import { AddCommentComponent } from "../../comment/add-comment/add-comment.component";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['../../../../assets/list_layout.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[];
  numberOfComments: number;
  submitted = false;
  p:number = 1;

  constructor(private commentService: CommentService,
              private modalService: NgbModal) { }

  ngOnInit() {
      this.loadComments()
  }

  loadComments() {
    this.commentService.findAll().subscribe(data => {
      this.comments = data;
      this.numberOfComments = data.length;
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(data=> {
      this.loadComments();
      this.numberOfComments --;
    });
  }

  openEditCommentForm(comment) {
    const modalRef = this.modalService.open(EditCommentComponent, { size: 'lg' });
    modalRef.componentInstance.comment = comment;
    modalRef.result.then((result) => {
      if (result) {
        this.submitted = true;
      }
    });
  }

  openAddCommentForm() {
    const modalRef = this.modalService.open(AddCommentComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        this.submitted = true;
        this.loadComments();
      }
    });
  }
}
