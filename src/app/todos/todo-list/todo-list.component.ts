import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @Input() todos: Observable<Todo[]>;
  changes = 0;

  constructor(private todoService: TodoService) { }

  get runChangeDetection(): number {
    console.log(`Todo List Change Detected`);
    return ++this.changes;
  }

  ngOnInit(): void {
    this.subscribeTodoListLoaded();
    console.log(`Loading initial 10 elements...`);
    this.todoService.load(2);
  }

  loadData() {
    console.log(`Loading 10 more elements...`);
    this.todoService.load(10);
  }

  private subscribeTodoListLoaded() {
    this.todoService.todos$.subscribe(async () => {
      console.log(`Data loaded... Total: ${this.todoService.count}`);
      if (this.infiniteScroll) {
        await this.infiniteScroll.complete();
        // if all data is loaded
        // disable the infinite scroll
        if (this.todoService.count >= this.todoService.limit) {
          this.infiniteScroll.disabled = true;
        }
      }
    });
  }
}
