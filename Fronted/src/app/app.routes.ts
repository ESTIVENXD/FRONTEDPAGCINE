import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Anuncio } from './anuncio/anuncio';
import { Usuario } from './usuario/usuario';
import { Sala } from './sala/sala';
import { Genero } from './genero/genero';
import { Clasificacion } from './clasificacion/clasificacion';
import { Telefonos } from './telefonos/telefonos';
import { Asiento } from './asiento/asiento';
import { Pelicula } from './pelicula/pelicula';
import { Funcion } from './funcion/funcion';
import { ReporteVentas } from './reporte-ventas/reporte-ventas';
import { RolPermiso } from './permiso/rol.permiso';
import { Reserva } from './reserva/reserva';
import { Cliente } from './cliente/cliente';


export const routes: Routes = [
  {path: "", component:Login},
  {path: "anuncio", component:Anuncio},
  {path: "usuario", component:Usuario},
  {path: "sala", component:Sala},
  {path: "genero", component:Genero},
  {path: "clasificacion", component:Clasificacion},
  {path: "telefonos/:idUsuario", component:Telefonos},
  {path: "asiento/:idSala", component:Asiento},
  {path: "pelicula", component:Pelicula},
  {path: "funcion", component:Funcion},
  {path: "reporteVentas", component:ReporteVentas, canActivate: [RolPermiso]},
  {path: "reserva", component:Reserva},
  {path: "cliente", component:Cliente},


];
