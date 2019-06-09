import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'definicao', loadChildren: './pages/definicao/definicao.module#DefinicaoPageModule', canActivate: [AuthGuard] },
  { path: 'definicao/:id', loadChildren: './pages/definicao/definicao.module#DefinicaoPageModule', canActivate: [AuthGuard] },
  { path: 'treinamento', loadChildren: './pages/treinamento/treinamento.module#TreinamentoPageModule', canActivate: [AuthGuard] },
  { path: 'treinamento/:id', loadChildren: './pages/treinamento/treinamento.module#TreinamentoPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }