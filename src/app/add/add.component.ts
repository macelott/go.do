import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Todo } from '../todo';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  myDateValue: Date;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.myDateValue = new Date();
  }

  onAddTodo(title: string, due_todo: string): void {
    title = title.trim();
    due_todo = due_todo.trim();
    var display_order = document.getElementById("todo-list").childElementCount + 1;
    console.log(display_order);

    if (!title) { return; }
    if (!due_todo) { return; }

    console.log('Todo due date: ' + due_todo);

    this.dataService.addTodo({ title, display_order, due_todo } as Todo).subscribe(todo => {
      //console.log('todo contains: ' + JSON.stringify(todo))
      this.dataService.subjectTodo.next(todo);
    });
  }

  onDateChange(newDate: Date) {
    console.log('The date you picked! ' + newDate);
  }
}

