import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoPageRoutingModule } from './todo-routing.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosPage } from './todos.page';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TodoPageRoutingModule,
  ],
  declarations: [TodosPage, TodoListComponent, TodoItemComponent],
})
export class TodoPageModule { }
