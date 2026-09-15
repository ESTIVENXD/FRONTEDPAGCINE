import { Routes } from '@angular/router';
import {Login } from './login/login';
import { Bienvenido } from './bienvenido/bienvenido';

export const routes: Routes = [
  { path: "", component:Login },
  {path: "bienvenido", component:Bienvenido}
];
