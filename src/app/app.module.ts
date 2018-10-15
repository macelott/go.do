import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragAndDropModule } from 'angular-draggable-droppable';
import { DndModule } from 'ng2-dnd';
import { CalendarComponent } from './calendar/calendar.component';


const appRoutes: Routes = [
    { path: 'list', component: TodoListComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent,
    TodoComponent,
    UpdateComponent,
    AddComponent,
    CalendarComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    DragAndDropModule,
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    HttpClientModule,
    DndModule.forRoot()  
  ],
  providers: [
    FormsModule,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
