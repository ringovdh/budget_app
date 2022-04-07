import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Transaction} from '../model/transaction'
import { ImportResponse} from '../model/importResponse'

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private importURL: string;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {
    this.importURL = 'http://localhost:8080/importTransactions';
  }

  public pushFileToBackend(file: File): Observable<ImportResponse> {

    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<ImportResponse>(this.importURL, data)
  }
}
