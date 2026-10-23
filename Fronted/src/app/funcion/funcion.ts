import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-funcion',
  styleUrl: './funcion.css',
  templateUrl: './funcion.html',
})
export class Funcion implements  OnInit{

   formularioFuncion:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

   funciones:any =[];
   peliculas:any =[];
   salas:any =[];

   constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioFuncion = this.fb.group(
      {
        idPelicula:['',[Validators.required]],
        idSala:['',[Validators.required]],
        fecha:['',[Validators.required]],
        hora:['',[Validators.required]],
        precioEntrada:['',[Validators.required]],
}
);
    this.http = http;
    this.cdr = cdr;
  }
    ngOnInit(): void {
    this.buscarFuncion();
    this.buscarPelicula();   
    this.buscarSala(); 
    
  }
  buscarFuncion(){
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {this.funciones=data 
      this.cdr.detectChanges();
      }
    )
  }
  buscarPelicula(){
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {this.peliculas=data 
      this.cdr.detectChanges();
      }
    ) 
  }
  buscarSala(){
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {this.salas=data 
      this.cdr.detectChanges();
      }
    ) 
  }

   guardarFuncion(){
    if (this.formularioFuncion.valid){
      let temp = {...this.formularioFuncion.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/funcion",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
   mostrar (data:any){
    if (data?.idFuncion){
      alert("Funcion creada con el id: "+data.idFuncion);
      this.buscarFuncion();
    }
    else{
      alert("Error al crear Anuncio, exsite un problema en el servidor.")
    }
  }
}