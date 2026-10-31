import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pelicula',
})
export class PeliculaPipe implements PipeTransform {
  transform(value: number, peliculas: any []): string {

    for(let pelicula of peliculas){
      if (pelicula.idPelicula==value){
        return pelicula.titulo;
      }
    }
    return 'No hay informacion'
  }
}
