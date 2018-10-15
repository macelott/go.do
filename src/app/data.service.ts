import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  subjectTodo = new Subject<any>();
  private todoAddEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

    getTodos() {
      this.http.get('/api/todos').subscribe((data)=>{
        //console.log('Data: ' + data)
        this.subjectTodo.next(data);
      });
    }

    updateTodo(todo: Todo): Observable<any> {
      //console.log('dataService: ' + JSON.stringify(todo));
      return this.http.put('/api/todos', todo);
    }

    deleteTodo(todo: Todo): Observable<any> {
      //console.log('dataService: ' + JSON.stringify(todo));
      return this.http.put('/api/todos/delete', todo);
    }

    addTodo(todo: Todo): Observable<any> {
      return this.http.post('/api/todos', JSON.stringify(todo))
    }

  moveTodo(input) {
      console.log('move called');
      console.log(input)
      return this.http.put('/api/move', input);
    }

}
