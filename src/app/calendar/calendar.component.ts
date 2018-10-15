import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { Todo } from '../todo';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  today: Date = new Date;
  start: Date;
  end: Date;
  first: string;
  last: string;

  todos$: Todo[];
  subscriptionTodo: Subscription;

  mondayTodos: Todo[] = [];
  tuesdayTodos: Todo[] = [];
  wednesdayTodos: Todo[] = [];
  thursdayTodos: Todo[] = [];
  fridayTodos: Todo[] = [];
  saturdayTodos: Todo[] = [];
  sundayTodos: Todo[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    var first = this.today.getDate() - this.today.getDay();
    var last = first + 6;

    this.start = new Date(this.today.setDate(first));
    this.end = new Date(this.today.setDate(last));

    this.first = this.start.toLocaleDateString("en-US");
    this.last = this.end.toLocaleDateString("en-US");

    this.subscriptionTodo = this.dataService.subjectTodo.subscribe(todo => {
      console.log('retrieved todo in calendar: ' + JSON.stringify(todo))
      this.todos$ = todo;
      this.fillTodos();
    });
    console.log("1");
    this.refreshTodos();
  }

  fillTodos() {
    console.log("in fillTodos")
    var first = this.today.getDate() - this.today.getDay();

    for (let todo of this.todos$) { //(var todo in this.todo$)
      console.log(new Date(this.today.setDate(first)).toLocaleDateString("en-US") + " vs " + new Date(todo.due_todo).toLocaleDateString("en-US"))

      if (new Date(this.today.setDate(first)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.sundayTodos.push(todo);
        console.log("sunday");
      }
      else if (new Date(this.today.setDate(first + 1)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.mondayTodos.push(todo);
        console.log("monday");
      }
      else if (new Date(this.today.setDate(first + 2)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.tuesdayTodos.push(todo);
        console.log("tuesday");
      }
      else if (new Date(this.today.setDate(first + 3)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.wednesdayTodos.push(todo);
        console.log("wednesday");
      }
      else if (new Date(this.today.setDate(first + 4)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.thursdayTodos.push(todo);
        console.log("thursday");
      }
      else if (new Date(this.today.setDate(first + 5)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.fridayTodos.push(todo);
        console.log("friday");
      }
      else if (new Date(this.today.setDate(first + 6)).toLocaleDateString("en-US") == new Date(todo.due_todo).toLocaleDateString("en-US")) {
        this.saturdayTodos.push(todo);
        console.log("saturday");
      }
    }
  }

  refreshTodos() {
    this.dataService.getTodos();
  }

}
