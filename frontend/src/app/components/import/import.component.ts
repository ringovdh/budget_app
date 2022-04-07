import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportService } from '../../service/import-service';
import { Transaction } from '../../model/transaction';
import { AddTransactionComponent } from '../transaction/add-transaction/add-transaction.component';
import {Category} from "../../model/category";
import {TxPerMonthGroupDetails} from "../transaction/model/TxPerMonthGroupDetails";

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
  existingTransactions: Transaction[];
  transaction: Transaction;
  numberOfTransactions: number;
  submitted = false;
  noTransactions = false;
  p = 1;
  txPerMonthDetails: TxPerMonthGroupDetails;
  availableBudget: number;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private importService: ImportService) { }

  ngOnInit() {
    this.txPerMonthDetails = new TxPerMonthGroupDetails();
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
    this.transactions = [];
    this.existingTransactions = [];
    this.importService.pushFileToBackend(this.selectedFile).subscribe(data => {
      this.transactions = data.filteredTransactions;
      this.numberOfTransactions = data.filteredTransactions.length;
      this.existingTransactions = data.existingTransactions;
      this.availableBudget = data.availableBudget;
      console.log(data)
      this.showUploadForm = false;
      this.txPerMonthDetails.groupAndCalculateTransactions(this.existingTransactions);
    });

    if (this.transactions.length == 0) {
      this.noTransactions = true
    }
  }

  openNewTransactionForm() {

    this.openFormModal(new Transaction());
  }

  openFormModal(tx) {
    this.transaction = tx;
    if (null == tx.category) {
      tx.category = new Category();
    }
    const modalRef = this.modalService.open(AddTransactionComponent, { size: 'lg', windowClass: 'modal-transactions'});
    modalRef.componentInstance.transaction = this.transaction;
    modalRef.result.then((result) => {
      if (result) {
        this.existingTransactions.push(tx);
        this.txPerMonthDetails.groupAndCalculateTransactions(this.existingTransactions);
        let index = this.transactions.indexOf(result);
        this.transactions.splice(index,1);
        this.numberOfTransactions --;
        this.submitted = true;
      }
    });
  }

}
