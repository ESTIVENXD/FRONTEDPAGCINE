import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'anuncio',
        loadComponent: () =>
          import('../anuncio/anuncio.page').then((m) => m.AnuncioPage),
      },
      {
        path: 'funcion',
        loadComponent: () =>
          import('../funcion/funcion.page').then((m) => m.FuncionPage),
      },
      {
        path: 'reserva/:idFuncion',
        loadComponent: () =>
          import('../reserva/reserva.page').then((m) => m.ReservaPage),
      },
    
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
];