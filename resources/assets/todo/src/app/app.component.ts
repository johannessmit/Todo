import { Component, OnInit } from '@angular/core'
import { Todo } from './todo'
import { TodoService } from './todo.service'
import './rxjs-operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  title = `Todo's`
  todos: Todo[]
  todosOrder: {} = {}

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(filter : string = null): void {
    this.todoService.getTodos(filter).subscribe(todos => {
      this.todos = todos

      for (let todoPlace in todos) {
          this.todosOrder[todos[todoPlace].id] = todoPlace;
      }
      console.log(this.todosOrder);
    })
  }

  onCreateTodo(todoData): void {
    this.todoService.addTodo(todoData).subscribe(todo => {
      const todosLength = this.todos.push(todo);
      this.todosOrder[todo.id] = todosLength-1;
    })
  }

  onUpdateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(todo => {
      this.todos[this.todosOrder[todo.id]] = todo;
    })
  }

  onDeleteTodo(id): void {
    this.todoService.deleteTodo(id).subscribe(id => {
      this.todos.splice(this.todosOrder[id], 1);
      delete this.todosOrder[id];
    })
  }

  onFilterTodo(filter : string = null) {
    switch (filter) {
      case 'withTrashed':
        this.getTodos('withTrashed')
        break
      
      case 'normal':
      default:
        this.getTodos()
        break
    }
  }
}