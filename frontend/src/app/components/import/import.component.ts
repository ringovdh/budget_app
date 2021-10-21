import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportService } from '../../service/import-service';
import { Transaction } from '../../model/transaction';
import { AddTransactionComponent } from '../transaction/add-transaction/add-transaction.component';
import {Category} from "../../model/category";

@Component({
  selector: 'import',
  templateUrl: './import.component.html',
  styleUrls: ['../../../assets/import_layout.css']
})
export class ImportComponent implements OnInit {

  uploadForm: FormGroup;
  showUploadForm= true;
  selectedFile: null;
  transactions: Transaction[];
  transaction: Transaction;
  numberOfTransactions: number;
  submitted = false;
  noTransactions = false;
  infoTxSaldo = 0;
  p:number = 1;

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

  upload() {
    this.importService.pushFileToBackend(this.selectedFile).subscribe(data => {
      this.transactions = data.filteredTransactions;
      this.numberOfTransactions = data.filteredTransactions.length;
      this.infoTxSaldo = data.saldo;
      this.showUploadForm = false;
    });
    if (this.transactions.length == 0){
      this.noTransactions = true
    }
  }

  openNewTransactionForm(){
    this.openFormModal(new Transaction());

  }

  openFormModal(tx) {
    this.transaction = tx;
    if (null == tx.category) {
      tx.category = new Category();
    }
    const modalRef = this.modalService.open(AddTransactionComponent, { size: 'lg' });
    modalRef.componentInstance.transaction = this.transaction;
    modalRef.result.then((result) => {
    if (result) {
      this.calculateSaldo(tx);
      let index = this.transactions.indexOf(result);
      this.transactions.splice(index,1);
      this.numberOfTransactions --;
      this.submitted = true;
    }
    });
  }

  private calculateSaldo(tx) {
    if (tx.sign== '-') {
      this.infoTxSaldo = this.infoTxSaldo - tx.amount
    } else {
      this.infoTxSaldo = this.infoTxSaldo + tx.amount
    }
  }

}
