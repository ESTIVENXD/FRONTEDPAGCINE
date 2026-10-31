import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol',
})
export class RolPipe implements PipeTransform {
  transform(value: number, roles: any[]): String {
    
    for(let rol of roles){
      if(rol.idRol==value){
        return rol.nombre;
      }
    }
    return 'No hay informacion'
  }
}
