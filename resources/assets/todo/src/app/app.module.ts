import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewTodoItemComponent } from './new-todo-item/new-todo-item.component';
import { TodoListMenuComponent } from './todo-list-menu/todo-list-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    NewTodoItemComponent,
    TodoListMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
