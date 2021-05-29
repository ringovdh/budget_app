import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category-service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category;
  submitted = false;

  constructor (private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.submitted = false;
  }

  addCategoryForm = new FormGroup({
    category_label: new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
  });

  saveCategory(){
      this.category = new Category();
      this.category.label = this.CategoryLabel.value;
      this.submitted = true;
      this.save();
  }

  get CategoryLabel() {
    return this.addCategoryForm.get('category_label');
  }

  save() {
    this.categoryService.saveCategory(this.category)
      .subscribe(data => {
        this.category = new Category();
        this.router.navigate(['/categories']);
      });
  }
}
