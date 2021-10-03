import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../service/category-service';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['../../../../assets/modal_form_layout.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category;

  constructor (private activeModal: NgbActiveModal,
               private categoryService: CategoryService) {}

  ngOnInit() {
    this.category = new Category();
  }

  closeAndSave() {
    this.categoryService.saveCategory(this.category).subscribe();
    this.activeModal.close(this.category);
  }

}
