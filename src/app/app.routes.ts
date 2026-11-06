import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // "/" vira "/login"
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: '**', redirectTo: 'login' } // qualquer URL desconhecida cai no login
];