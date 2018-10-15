import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

import { Todo } from '../todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() todo$: Todo;
  @ViewChild("title") titleField: ElementRef;
  myDateValue: Date;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.myDateValue = new Date();
    //this.titleField.nativeElement.focus();
  }

  onUpdateTodo(todo: Todo, title: string, due_todo: string): void {
    todo.title = title;
    todo.due_todo = due_todo;
    var id: string = String(todo.id);
    var done = String(todo.done);
    var display_order = String(todo.display_order);

    console.log('updated date: ' + due_todo);

    if (!title || !id) { return; }

    // this.dataService.updateTodo(todo).subscribe(() => console.log("updated"));

    this.dataService.updateTodo(todo).subscribe(todo => {
      this.dataService.subjectTodo.next(todo);
    });
  }

}
