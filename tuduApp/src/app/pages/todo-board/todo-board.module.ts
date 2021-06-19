import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoBoardPageRoutingModule } from './todo-board-routing.module';

import { TodoBoardPage } from './todo-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoBoardPageRoutingModule
  ],
  declarations: [TodoBoardPage]
})
export class TodoBoardPageModule {}
