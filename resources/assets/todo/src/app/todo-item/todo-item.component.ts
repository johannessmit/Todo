import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input()
  todo: Todo = null;
  inputMode: boolean = false;

  constructor(private todoService: TodoService) { }

  onClick() {
    this.inputMode = !this.inputMode;
  }

  onClickInput(event) {
    event.stopPropagation();
  }

  onCheck(event) {
    event.stopPropagation();
    
    this.todo.status = this.todo.status ? 0 : 1;

    this.todoService.updateTodo(this.todo).then(todo => { this.todo = todo });
  }

  onChange(event) {
    const input = event.target;
    const newValue = input.value;
    const newData = Object.assign(this.todo, {todo: newValue});
    
    this.inputMode = !this.inputMode;
    this.todoService.updateTodo(newData).then(todo => { this.todo = todo});
  }
}
