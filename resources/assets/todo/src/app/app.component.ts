import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  title = `Todo's`;
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  onCreateTodo(): void {
    this.getTodos();
  }

  onDeleteTodo(): void {
    this.getTodos();
  }
}