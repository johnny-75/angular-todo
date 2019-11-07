import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  URL = 'http://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';
  httpHeaders = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.URL}${this.todosLimit}`);
  }

  setCompleted(todoItem: Todo): Observable<any> {
    const id: number = todoItem.id;
    return this.http.put<any>(`${this.URL}/${id}`, todoItem, this.httpHeaders);
  }

  deleteTodo(todoItem: Todo): Observable<any> {
    const id: number = todoItem.id;
    return this.http.delete<any>(`${this.URL}/${id}`, this.httpHeaders);
  }

  addTodo(newTodo): Observable<any> {
    return this.http.post<any>(`${this.URL}`, newTodo, this.httpHeaders);
  }
}
