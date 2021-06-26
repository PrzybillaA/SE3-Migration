import { Component, OnInit } from '@angular/core';
import { DatenbankService } from 'src/app/services/datenbank.service';
import { Todo } from 'src/app/services/models/todo';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.page.html',
  styleUrls: ['./todo-board.page.scss'],
})
export class TodoBoardPage implements OnInit {

  todos: Array<Todo>;
  newTodo: Todo = new Todo();

  constructor(
    private db: DatenbankService
  ) {}

  ngOnInit() {
    this.db.getAlleTodos().then((response) => {
      this.todos = response;
    });
  }

  createTodo() {
    // Todo
  }

}