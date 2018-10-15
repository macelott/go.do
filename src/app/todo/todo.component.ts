import { Component, OnInit, Input, NgModule} from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { Todo } from '../todo';


import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
  declarations: [TodoComponent],
  imports: [DragAndDropModule],
  bootstrap: [TodoComponent]
})

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  @Input() todo$: Todo;
  @Input() i: number;
  selectedTodo: Todo;


  edit: Boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onCheck() {
    this.todo$.done = !this.todo$.done;
    // this.dataService.updateTodo(todo).subscribe(() => console.log("updated"));

    this.dataService.updateTodo(this.todo$).subscribe(todo => {
      this.dataService.subjectTodo.next(todo);
    });
  }

  onSelect(todo: Todo){
    this.selectedTodo = todo;
    this.edit = !this.edit;
    console.log(this.selectedTodo);
  }

  delete(todo: Todo){
    var id: string = String(todo.id);
    var title: string = String(todo.title);
    console.log('delete ' + id + ' ' + title);
    if (!title || !id) { return; }

    this.dataService.deleteTodo(todo).subscribe(todo => {
        this.dataService.subjectTodo.next(todo);
    });
  }

  focusOutUpdate(){
    setTimeout(() =>
    {

    this.edit = false;
    console.log(this.edit);
    },
    500);
  }

  position(){
    console.log(this.i);
  }

  onMove(todo: Todo, position: number) {
    //console.log(todo);
    //console.log(position);
    var total_items = document.getElementById("todo-list").childElementCount;
    todo.display_order = total_items - position;
    this.dataService.moveTodo(todo).
      subscribe(() => console.log("Moved"));;
}
}
