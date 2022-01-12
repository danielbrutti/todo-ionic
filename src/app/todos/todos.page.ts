import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../shared/model/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosPage implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  add(): void {
    this.todoService.add();
  }

  refresh(): void {
    this.todoService.loadPage();
  }

}
