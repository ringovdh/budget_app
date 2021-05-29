import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category'
import { CategoryService } from '../../service/category-service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {

  categories: Category[];
  deleteMessage=false;

  constructor (private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.findAll().subscribe(data => {
        this.categories = data;
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data=> {
      this.deleteMessage=true;
      this.loadCategories();
    });
  }

}
