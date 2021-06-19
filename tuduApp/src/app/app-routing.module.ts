import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPageModule } from './pages/login/login.module';
import { TodoBoardPageModule } from './pages/todo-board/todo-board.module';
import { HilfePageModule } from './pages/hilfe/hilfe.module';
import { EinstellungenPageModule } from './pages/einstellungen/einstellungen.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => LoginPageModule
  },
  {
    path: 'todo-board',
    loadChildren: () => TodoBoardPageModule
  },
  {
    path: 'einstellungen',
    loadChildren: () => HilfePageModule
  },
  {
    path: 'hilfe',
    loadChildren: () => EinstellungenPageModule
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
