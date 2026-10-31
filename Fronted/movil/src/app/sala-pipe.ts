import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sala',
})
export class SalaPipe implements PipeTransform {
  transform(value: number, salas: any[]): string {
 for(let sala of salas){
      if (sala.idSala==value){
        return sala.nombre;
      }
    }
    return 'No hay informacion'
  }
}
