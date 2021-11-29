import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../service/category-service';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../../../../assets/modal_form_layout.css']
})
export class EditCategoryComponent implements OnInit {

  category: Category;

  constructor(public activeModal: NgbActiveModal,
              private categoryService: CategoryService) { }

  ngOnInit() {
  }

  closeAndSave() {
    this.categoryService.saveCategory(this.category).subscribe();
    this.activeModal.close(this.category);
  }

}
