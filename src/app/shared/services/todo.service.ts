import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$: Observable<Todo[]>;

  limit = 100;

  private dataSource: Todo[] = [];

  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject(this.dataSource);

  constructor() {
    this.todos$ = this.todos.asObservable();
  }

  get count(): number {
    return this.dataSource.length;
  }

  load(size: number): void {
    for (let i = 0; i < size; i++) {
      this.dataSource.push({
        description: `Todo # ${new Date().getTime()}`,
        completed: false,
        due: this.randomDate()
      });
    }
    this.todos.next(this.dataSource);
  }

  markComplete(todo: Todo): void {
    todo.description = `Todo # ${new Date().getTime()}`;
    todo.completed = true;
  }

  add(): void {
    this.dataSource.push({
      description: `Todo # ${new Date().getTime()}`,
      completed: false,
      due: this.randomDate()
    });
    console.log(this.dataSource);
    this.todos.next(this.dataSource);
  }

  private randomDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + Math.round(Math.random() * 10));
    return date;
  }
}
