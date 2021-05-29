import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../model/comment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentURL: string;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {
    this.commentURL = 'http://localhost:8080/comments';
  }

  public findAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentURL);
  }

  public saveComment(comment: Object): Observable<Object> {
    return this.http.post(this.commentURL, comment, this.httpOptions)
  }

  public getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(this.commentURL + '/' + id);
  }

  public editComment(id, comment): Observable<Object> {
    return this.http.put(this.commentURL, comment, this.httpOptions)
  }

  public deleteComment(id: number): Observable<any> {
    return this.http.delete(this.commentURL + '/' + id, { responseType: 'text' });
  }
}
