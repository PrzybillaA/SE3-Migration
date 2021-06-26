import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TodoComponent } from './todo/todo.component';


const PAGES_COMPONENTS = [
  TodoComponent
]

@NgModule({
  declarations: [PAGES_COMPONENTS],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PAGES_COMPONENTS
  ]
})

export class ComponentsModule { }
