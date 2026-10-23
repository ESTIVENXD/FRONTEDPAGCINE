import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-pelicula',
  styleUrl: './pelicula.css',
  templateUrl: './pelicula.html',
})
export class Pelicula implements  OnInit{

  formularioPelicula:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  peliculas:any =[];
  generos:any =[];
  clasificaciones:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioPelicula = this.fb.group(
      {
        titulo:['',[Validators.required]],
        sinopsis:['',[Validators.required]],
        duracionMinutos:['',[Validators.required]],
        idGenero:['',[Validators.required]],
        idClasificacion:['',[Validators.required]],
        imagenPromocional:['']
}
    );
    this.http = http;
    this.cdr = cdr;
  }
  ngOnInit(): void {
    this.buscarPelicula();    
    this.buscarGenero();
    this.buscarClasificacion();
  }
  buscarPelicula(){
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {this.peliculas=data 
      this.cdr.detectChanges();
      }
    )
  }

  buscarGenero(){
    this.http.get("http://localhost:8080/genero/buscar").subscribe(
      data => {this.generos=data 
      this.cdr.detectChanges();
      }
    )
  }

  buscarClasificacion(){
    this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
      data => {this.clasificaciones=data 
      this.cdr.detectChanges();
      }
    )
  }
  

  agregarImagen(event:any){
    const archivo = event.target.files[0];
    if (archivo){
      const lector = new FileReader();
      lector.onload = () => {
        this.formularioPelicula.patchValue({imagenPromocional: lector.result });
        this.cdr.detectChanges(); 
      };
      lector.readAsDataURL(archivo);
      
    }
     }

  guardarPelicula(){
    if (this.formularioPelicula.valid){
      let temp = {...this.formularioPelicula.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/pelicula",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
   mostrar (data:any){
    if (data?.idPelicula){
      alert("Pelicula creada con el id: "+data.idPelicula);
      this.buscarPelicula();
    }
     else{
      alert("Error al crear Anuncio, exsite un problema en el servidor.")
    }
  }
}
