import { Routes } from '@angular/router';
import { IniciarSesion } from './iniciar-sesion/iniciar-sesion';
import { PaginaBienvenido } from './pagina-bienvenido/pagina-bienvenido';
import { PerfilUsuario } from './perfil-usuario/perfil-usuario';

export const routes: Routes = [
  { path: '', redirectTo: 'iniciar-sesion', pathMatch: 'full' },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'pagina-bienvenido', component: PaginaBienvenido },
  { path: 'perfil', component: PerfilUsuario }
];


