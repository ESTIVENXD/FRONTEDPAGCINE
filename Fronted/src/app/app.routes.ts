import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Anuncio } from './anuncio/anuncio';
import { Usuario } from './usuario/usuario';
import { Sala } from './sala/sala';
import { Genero } from './genero/genero';
import { Clasificacion } from './clasificacion/clasificacion';

export const routes: Routes = [
  { path: "", component:Login },
  {path: "anuncio", component:Anuncio},
  {path: "usuario", component:Usuario},
  {path: "sala", component:Sala},
  {path: "genero", component:Genero},
  {path: "clasificacion", component:Clasificacion},
];
