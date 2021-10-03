import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../model/transaction';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionURL: string;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {
    this.transactionURL = 'http://localhost:8080/transactions';
  }

  public findAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionURL);
  }

  public saveTransaction(transaction: Transaction): Observable<Object> {
    return this.http.post(this.transactionURL, transaction, this.httpOptions)
  }
}
