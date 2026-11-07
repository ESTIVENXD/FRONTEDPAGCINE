import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RolPermiso: CanActivateFn = (route, state) => {
  const router = inject(Router);

   const usuarioString = localStorage.getItem('usuario');

  if (usuarioString) {
    const usuario = JSON.parse(usuarioString);
    if (usuario.idRol === 1 || usuario.idRol === 2) {
      return true;
    }
  }


  alert('Acceso denegado: Solo el perfil de Gerente o Administrador puede ver los reportes.');
  router.navigate(['/reserva']);
  return false;
};