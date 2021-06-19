import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoBoardPage } from './todo-board.page';

const routes: Routes = [
  {
    path: '',
    component: TodoBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoBoardPageRoutingModule {}
