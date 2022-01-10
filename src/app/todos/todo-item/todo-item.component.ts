import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../shared/model/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  changes = 0;

  constructor(private todoService: TodoService) { }

  get runChangeDetection(): number {
    console.log(`Todo Item Change Detected`);
    return ++this.changes;
  }

  ngOnInit() { }

  markComplete(): void {
    this.todoService.markComplete(this.todo);
  }

}
