import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cliente',
})
export class ClientePipe implements PipeTransform {
  transform(value: number, clientes: any[]): String {
    
    if (clientes) {
      for (let cliente of clientes) {
        if (cliente.idCliente == value) {
          return cliente.nombres + ' ' + cliente.apellidos;
        }
      }
    }
    
    return 'No hay informacion';
  }
}
