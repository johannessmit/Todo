import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-new-todo-item',
  templateUrl: './new-todo-item.component.html',
  styleUrls: ['./new-todo-item.component.css']
})
export class NewTodoItemComponent {
  @Output() create: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService : TodoService) { }

  onChange(event) {
    const input = event.target;
    const todoValue = input.value;

    todoValue && this.todoService.addTodo({todo: todoValue}).then(todo => this.create.emit(todo));
  }
}
