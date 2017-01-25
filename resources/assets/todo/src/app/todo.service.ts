import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Todo } from './todo';

const API_URL = environment.apiUrl;

@Injectable()
export class TodoService {
  constructor(private http: Http) {}

  getTodos(filter : string = null) : Observable<Todo[]> {
    let url = `${API_URL}todos`

    if (filter) {
      url += `?filter=${filter}`
    }

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getTodo(id : number) : Observable<Todo> {
    return this.http.get(`${API_URL}todos/${id}`)
      .map(this.extractData)
      .catch(this.handleError)
  }

  updateTodo(data : Todo) : Observable<Todo> {
    return this.http.put(`${API_URL}todos/${data.id}`, data)
      .map(this.extractData)
      .catch(this.handleError)
  }

  addTodo(data : Object) : Observable<Todo> {
    return this.http.post(`${API_URL}todos`, data)
      .map(this.extractData)
      .catch(this.handleError)
  }

  deleteTodo(id : number) : Observable<number> {
    return this.http.delete(`${API_URL}todos/${id}`)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(response: Response) {
    let body = response.json()
    return body
  }

  private handleError(error: Response | any) {
    let errorMessage : string
    if (error instanceof Response) {
      const body = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errorMessage = error.message ? error.message : error.toString()
    }
    console.error(errorMessage)
    return Observable.throw(errorMessage)
  }
}
