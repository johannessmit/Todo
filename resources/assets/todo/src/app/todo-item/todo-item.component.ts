import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

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
  @Output() update: EventEmitter<Todo> = new EventEmitter();
  @Output() check: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

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

    this.check.emit(updatedTodo);
  }

  onChange(event) {
    // const input = event.target;
    // const newValue = input.value;
    const newData = Object.assign(this.todo, {todo: event});
    
    this.inputMode = !this.inputMode;
    this.update.emit(newData);
  }

  onClickDelete(event) {
    event.stopPropagation();

    this.delete.emit(this.todo.id);
  }

  setClasses() {
    const isDeleted = this.todo.status === Todo.DELETED,
      isDone = this.todo.status === Todo.DONE,
      isUndone = this.todo.status === Todo.UNDONE
    
    return {
      deleted: isDeleted,
      done: isDone,
      undone: isUndone
    }
  }
}
