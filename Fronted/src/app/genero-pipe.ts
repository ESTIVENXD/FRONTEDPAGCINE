import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero',
})
export class GeneroPipe implements PipeTransform {
  transform(value: number, generos: any[]): String {
    for (let genero of generos){
      if(genero.idGenero==value){
        return genero.nombre;
      }
    }
    return 'No hay informacion'
  }
}
