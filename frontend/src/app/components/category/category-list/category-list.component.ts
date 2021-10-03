import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../model/category'
import { CategoryService } from '../../../service/category-service'
import { EditCategoryComponent } from "../edit-category/edit-category.component";
import { AddCategoryComponent } from "../add-category/add-category.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../../../../assets/list_layout.css']
})

export class CategoryListComponent implements OnInit {

  categories: Category[];
  category: Category;
  numberOfcategories: number
  submitted = false;
  p: number = 1;
  deleteMessage=false;

  constructor (private categoryService: CategoryService,
               private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.findAll().subscribe(data => {
        this.categories = data;
        this.numberOfcategories = data.length;
      });
  }

  openEditCategoryForm(cat) {
    this.category = cat;
    const modalRef = this.modalService.open(EditCategoryComponent, { size: 'lg' });
    modalRef.componentInstance.category = this.category;
    modalRef.result.then((result) => {
      if (result) {
        this.submitted = true;
      }
    });
  }

  openAddCategoryForm() {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        this.submitted = true;
        this.numberOfcategories ++;
      }
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data=> {
      this.deleteMessage=true;
      this.loadCategories();
    });
  }

}
