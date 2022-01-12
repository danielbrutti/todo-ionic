import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
import { SERVER_URL } from '../../../environments/environment';
import { PaginateQuery } from '../model/paginate-query.model';
import { ApiService } from '../api/api.service';
import { API_SERVICE } from '../api/api.module';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$: Observable<Todo[]>;

  private totalItems = 0;
  private currentPage = 0;
  private limit = 20;

  private endpoint = `${SERVER_URL}/todo`;

  private dataSource: Todo[] = [];

  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject(this.dataSource);

  constructor(@Inject(API_SERVICE) private apiService: ApiService) {
    this.todos$ = this.todos.asObservable();
  }

  hasMore(): boolean {
    return this.totalItems > this.currentPage * this.limit;
  }

  loadPage(): void {
    const query: PaginateQuery = {
      page: ++this.currentPage,
      limit: this.limit,
      sortBy: [['completed', 'ASC'], ['due', 'ASC'], ['description', 'ASC']]
    };

    this.apiService
      .get(this.endpoint, query)
      .subscribe(
        ({ data, meta }) => {
          this.dataSource = [...this.dataSource, ...data];
          this.totalItems = meta.totalItems ?? data.length;
          this.currentPage = meta.currentPage ?? 1;
          this.todos.next(this.dataSource);
        },
        (error) => {
          this.currentPage--;
          console.log('An error occurred loading todo info', error);
        });
  }

  markComplete(todo: Todo): void {
    /**
     * TODO: implement HTTP PATCH call to mark as completed
     */
    todo.description = `Todo # ${new Date().getTime()}`;
    todo.completed = true;
  }

  add(): void {
    /**
     * TODO: implement HTTP POST for creation
     */
    this.dataSource.push({
      description: `Todo # ${new Date().getTime()}`,
      completed: false,
      due: this.randomDate()
    });
    this.todos.next(this.dataSource);
  }

  private randomDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + Math.round(Math.random() * 10));
    return date;
  }
}
