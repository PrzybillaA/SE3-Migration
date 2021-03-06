import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoBoardPageRoutingModule } from './todo-board-routing.module';

import { TodoBoardPage } from './todo-board.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoBoardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TodoBoardPage]
})
export class TodoBoardPageModule {}
