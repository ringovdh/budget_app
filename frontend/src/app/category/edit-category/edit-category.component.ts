import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category-service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category: Category;
  category_label: string;
  submitted = false;
  id: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.getCategory(this.route.snapshot.params['id']);
  }

  editCategoryForm = new FormGroup({
        category_label: new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
      });

  getCategory(id) {
    this.categoryService.getCategory(id).subscribe(data => {
      this.id = id;
      this.editCategoryForm.setValue({
        category_label: data.label
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.category = new Category();
    this.category.label = this.CategoryLabel.value;
    this.category.id = this.id
    this.submitted = true;
    this.edit();

  }

  edit(){
    this.categoryService.editCategory(this.id, this.category)
      .subscribe(data => {
          //let id = data['id'];
        this.router.navigate(['/categories']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  get CategoryLabel() {
      return this.editCategoryForm.get('category_label');
    }
}
