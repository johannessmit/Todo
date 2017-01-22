import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import axios from 'axios';
import { Todo } from './todo';

const API_URL = environment.apiUrl;

@Injectable()
export class TodoService {

  constructor() { }
  getTodos() : Promise<Todo[]> {
    const request = axios.get(`${API_URL}todos`);

    return new Promise((resolve, reject) => {
      request.then(data => resolve(data.data)).catch(error => reject(error));
    });
  }

  getTodo(id) : Promise<Todo> {
    const request = axios.get(`${API_URL}todos/${id}`);
    
    return new Promise((resolve, reject) => {
      request.then(data => resolve(data.data)).catch(error => reject(error));
    });
  }

  updateTodo(data) : Promise<Todo> {
    const request = axios.put(`${API_URL}todos/${data.id}`, data);

    return new Promise((resolve, reject) => {
      request.then(data => resolve(data.data)).catch(error => reject(error));
    });
  }

  addTodo(data) : Promise<Todo> {
    const request = axios.post(`${API_URL}todos`, data);

    return new Promise((resolve, reject) => {
      request.then(data => resolve(data.data)).catch(error => reject(error));
    });
  }

  deleteTodo(data) : Promise<number> {
    const request = axios.delete(`${API_URL}todos/${data.id}`);

    return new Promise((resolve, reject) => {
      request.then(data => resolve(data.data)).catch(error => reject(error));
    });
  }


}
