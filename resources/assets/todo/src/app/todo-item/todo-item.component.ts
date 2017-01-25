import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  onClick() {
    this.inputMode = !this.inputMode;
  }

  onClickInput(event) {
    event.stopPropagation();
  }

  onCheck(event) {
    event.stopPropagation();

    const updatedTodo = Object.assign(this.todo, {
      status: !this.todo.status
    });

    this.todoService.updateTodo(updatedTodo).subscribe(todo => { this.todo = todo });
  }

  onChange(event) {
    const input = event.target;
    const newValue = input.value;
    const newData = Object.assign(this.todo, {todo: newValue});
    
    this.inputMode = !this.inputMode;
    this.todoService.updateTodo(newData).subscribe(todo => { this.todo = todo});
  }

  onClickDelete(event) {
    event.stopPropagation();

    this.todoService.deleteTodo(this.todo.id).subscribe(todo => { this.todo = null });
  }
}
