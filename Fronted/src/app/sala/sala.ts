import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-sala',
  styleUrl: './sala.css',
  templateUrl: './sala.html',
})
export class Sala implements OnInit {

  formularioSala:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  salas:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioSala = this.fb.group(
      {
        nombre:['',[Validators.required]],
        filas:['',[Validators.required]],
        asientosPorFila:['',[Validators.required]]
      }
    );
    this.http = http;
    this.cdr = cdr;
    }
  ngOnInit(): void {
    this.buscarSala();    
  }
  buscarSala(){
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {this.salas=data 
      this.cdr.detectChanges();
      }
    )
  }

  guardarSala(){
    if (this.formularioSala.valid){
      let temp = {...this.formularioSala.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/sala",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
   mostrar (data:any){
    if (data?.idSala){
      alert("Sala creado con el id: "+data.idSala);
      this.buscarSala();
    }
    else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}