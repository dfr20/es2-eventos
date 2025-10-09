import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { CadastroParticipanteComponent } from './pages/cadastro-participante/cadastro-participante';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroParticipanteComponent
  },
  {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];