import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'todo-board',
    loadChildren: () => import('./pages/todo-board/todo-board.module').then( m => m.TodoBoardPageModule)
  },
  {
    path: 'einstellungen',
    loadChildren: () => import('./pages/einstellungen/einstellungen.module').then( m => m.EinstellungenPageModule)
  },
  {
    path: 'hilfe',
    loadChildren: () => import('./pages/hilfe/hilfe.module').then( m => m.HilfePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
