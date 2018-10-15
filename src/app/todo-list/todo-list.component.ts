import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Todo[];
  subscriptionTodo: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionTodo = this.dataService.subjectTodo.subscribe(todo => {
      //console.log('retrieved todo: ' + JSON.stringify(todo))
      this.todos$ = todo;
      for(let note of this.todos$){
        var stringDate: string = (note.due_todo).toString();
        var month = stringDate.slice(5, 7);
        var day = stringDate.slice(8, 10);
        var year = stringDate.slice(0, 4);
        stringDate = month.concat("/", day, "/", year);
        console.log('date stringified: ' + stringDate);
        note.due_todo = stringDate;
      }
      //debugger;
    });
    this.refreshTodos();
  }

  refreshTodos() {
    this.dataService.getTodos()
  }

  ngOnDestroy() {
    this.subscriptionTodo.unsubscribe();
  }

}
