import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ImportService } from '../service/import-service';
import { Transaction } from '../model/transaction';
import { AddTransactionComponent } from '../transaction/add-transaction/add-transaction.component';

@Component({
  selector: 'import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  uploadForm: FormGroup;
  selectedFile: null;
  transactions: Transaction[];
  tx: Transaction;
  submitted = false;
  noTransactions = false;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private importService: ImportService) { }

  ngOnInit() {
    this.submitted = false;
    this.uploadForm = this.formBuilder.group({
        profile: ['']
     });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    this.importService.pushFileToBackend(this.selectedFile).subscribe(data => {
      this.transactions = data;
    });
    if (this.transactions.length == 0){
      this.noTransactions = true
    }
  }

  openFormModal(tx) {
    this.tx = tx;
    const modalRef = this.modalService.open(AddTransactionComponent, { size: 'lg' });
    modalRef.componentInstance.tx = this.tx;
    modalRef.result.then((result) => {
    if (result) {
      let index = this.transactions.indexOf(result);
      this.transactions.splice(index,1);
      this.submitted = true;
    }
    });
  }
}
