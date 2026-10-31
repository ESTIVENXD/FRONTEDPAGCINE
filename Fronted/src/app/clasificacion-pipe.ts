import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clasificacion',
})
export class ClasificacionPipe implements PipeTransform {
  transform(value: number, clasificaciones: any[]): String {

  for (let clasificacion of clasificaciones){
    if(clasificacion.idClasificacion==value){
      return clasificacion.nombre;
    }
  }
  return 'No hay informacion'
  }
}
