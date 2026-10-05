import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-genero',
  styleUrl: './genero.css',
  templateUrl: './genero.html',
})
export class Genero implements OnInit {

formularioGenero:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  generos:any =[];

   constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioGenero = this.fb.group(
      {
        nombre:['',[Validators.required]]
      }
      );
    this.http = http;
    this.cdr = cdr;
   }
    ngOnInit(): void {
    this.buscarGenero();    
  }
  buscarGenero(){
    this.http.get("http://localhost:8080/genero/buscar").subscribe(
      data => {this.generos=data 
      this.cdr.detectChanges();
      }
    )
  }
  guardarGenero(){
    if (this.formularioGenero.valid){
      let temp = {...this.formularioGenero.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/genero",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
  mostrar (data:any){
    if (data?.idGenero){
      alert("Genero creado con el id: "+data.idGenero);
      this.buscarGenero();
    }
    else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}