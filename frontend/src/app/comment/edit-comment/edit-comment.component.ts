import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment-service';
import { CategoryService } from '../../service/category-service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../model/comment';
import { Category } from '../../model/category';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  id: number;
  comment: Comment;
  categories: Category[];
  comment_searchterm: string;
  comment_replacement: string;
  submitted = false;

  constructor(private commentService: CommentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
    this.getComment(this.route.snapshot.params['id']);
  }

  editCommentForm = new FormGroup({
      comment_searchterm: new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
      comment_replacement: new FormControl('', [Validators.required , Validators.minLength(2) ]),
      comment_category: new FormControl('')
  });

  getComment(id) {
    this.commentService.getComment(id).subscribe(data => {
      this.id = id;
      this.editCommentForm.setValue({
        comment_searchterm: data.searchterm,
        comment_replacement: data.replacement,
        comment_category: data.category
      });
      console.log('test id: ' + id)
    });
  }

  editComment(formValues) {
    console.log("hier");
    this.comment = new Comment();
    this.comment.id = this.id;
    this.comment.searchterm = formValues.comment_searchterm;
    this.comment.replacement = formValues.comment_replacement;
    this.comment.category = formValues.comment_category;
    if (this.editCommentForm.valid) {
      this.commentService.editComment(this.id, this.comment)
        .subscribe(data => {
          let id = data['id'];
        }, (error) => {
          console.log(error);
        }
      );
    }
  }
}
