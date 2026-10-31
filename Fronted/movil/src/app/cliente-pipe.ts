import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cliente',
})
export class ClientePipe implements PipeTransform {
  transform(value: number, clientes: any[]): string {
for(let cliente  of clientes){
      if (cliente.idCliente==value){
        return cliente.nombres;
      }
    }
    return 'No hay informacion'
  }
}
