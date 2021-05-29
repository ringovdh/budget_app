import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryURL: string;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {
    this.categoryURL = 'http://localhost:8080/categories';
  }

  public findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL);
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.categoryURL + '/' + id);
  }

  public saveCategory(category: Object): Observable<Object> {
    return this.http.post(this.categoryURL, category,this.httpOptions)
  }

  public editCategory(id:number, category:Object): Observable<Object> {
    return this.http.put(this.categoryURL, category, this.httpOptions)
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.categoryURL + '/' + id, { responseType: 'text' });
  }

}
