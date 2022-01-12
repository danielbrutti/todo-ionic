import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Todo } from '../../shared/model/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  todos: Observable<Todo[]>;
  changes = 0;

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.todos$;
  }

  get runChangeDetection(): number {
    return ++this.changes;
  }

  ngOnInit(): void {
    this.subscribeTodoListLoaded();
    this.todoService.loadPage();
  }

  loadData(event: any) {
    this.todoService.loadPage();
  }

  private subscribeTodoListLoaded() {
    this.todoService.todos$.subscribe(async () => {
      if (this.infiniteScroll) {
        await this.infiniteScroll.complete();
        // if all data is loaded
        // disable the infinite scroll
        if (!this.todoService.hasMore()) {
          this.infiniteScroll.disabled = true;
        }
      }
    });
  }
}
