import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-clasificacion',
  styleUrl: './clasificacion.css',
  templateUrl: './clasificacion.html',
})
export class Clasificacion implements OnInit {

  formularioClasificacion:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  clasificaciones:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioClasificacion = this.fb.group(

      {
        nombre:['',[Validators.required]],
      }
    );
    this.http = http;
    this.cdr = cdr;
    }
  ngOnInit(): void {
    this.buscarClasificacion();    
  }
  buscarClasificacion(){
    this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
      data => {this.clasificaciones=data 
      this.cdr.detectChanges();
      }
    )
  }
  guardarClasificacion(){
    if (this.formularioClasificacion.valid){
      let temp = {...this.formularioClasificacion.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/clasificacion",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
  mostrar (data:any){
    if (data?.idClasificacion){
      alert("Clasificacion creado con el id: "+data.idClasificacion);
      this.buscarClasificacion();
    }
    else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}