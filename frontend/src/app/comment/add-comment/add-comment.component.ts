import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Comment } from '../../model/comment';
import { Category } from '../../model/category';
import { CommentService } from '../../service/comment-service';
import { CategoryService } from '../../service/category-service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  comment: Comment;
  submitted: boolean;
  categories: Category[];

  constructor(private commentService: CommentService, private categoryService:CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
        console.log(data);
        this.categories = data;
    });
    this.submitted = false;
  }

  addCommentForm = new FormGroup({
    comment_searchterm: new FormControl('', [Validators.required]),
    comment_replacement: new FormControl('', [Validators.required]),
    comment_category: new FormControl('', [Validators.required])
  });

  saveComment(newComment) {
    this.comment = new Comment();
    this.comment.searchterm = this.addCommentForm.get('comment_searchterm').value;
    this.comment.replacement = this.addCommentForm.get('comment_replacement').value;
    this.comment.category = this.addCommentForm.get('comment_category').value;
    this.save();
  }

  save() {
    console.log(this.comment);
    this.commentService.saveComment(this.comment)
    .subscribe(data => console.log(data), error => console.log(error));
    this.router.navigate(['/comments']);
  }
}
