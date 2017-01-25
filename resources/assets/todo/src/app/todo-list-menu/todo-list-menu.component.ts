import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list-menu',
  templateUrl: './todo-list-menu.component.html',
  styleUrls: ['./todo-list-menu.component.css']
})
export class TodoListMenuComponent implements OnInit {
  showDeleted: boolean = false
  
  @Output() filter: EventEmitter<string> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {}

  toggleDeleted() {
    let showDeleted = !this.showDeleted

    switch (showDeleted) {
      case false:
        this.filter.emit()
        break
      case true:
        this.filter.emit('withTrashed')
        break
    }
    
    this.showDeleted = showDeleted;
  }
}
