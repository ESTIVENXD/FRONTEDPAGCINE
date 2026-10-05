import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-usuario',
  styleUrl: './usuario.css',
  templateUrl: './usuario.html',
})
export class Usuario implements  OnInit{

  formularioUsuario:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  usuarios:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioUsuario = this.fb.group(
      {
        nombres:['',[Validators.required]],
        apellidos:['',[Validators.required]],
        email:['',[Validators.required]],
        telefono:['',[Validators.required]],
        nombreUsuario:['',[Validators.required]],
        password:['',[Validators.required]],
        idRol:['',[Validators.required]],
        fotografia:['']
      }
    );
    this.http = http;
    this.cdr = cdr;
    }
  ngOnInit(): void {
    this.buscarUsuarios();    
  }
  buscarUsuarios(){
    this.http.get("http://localhost:8080/usuario/buscar").subscribe(
      data => {this.usuarios=data 
      this.cdr.detectChanges();
      }
    )
  }
  agregarFoto(event:any){
    const archivo = event.target.files[0];
    if (archivo){
      const lector = new FileReader();
      lector.onload = () => {
        this.formularioUsuario.patchValue({fotografia: lector.result });
        this.cdr.detectChanges(); 
      };
      lector.readAsDataURL(archivo);
      
    }
    
  }

  guardarUsuario(){
    if (this.formularioUsuario.valid){
      let temp = {...this.formularioUsuario.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/usuario",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

   mostrar (data:any){
    if (data?.idUsuario){
      alert("Usuario creado con el id: "+data.idUsuario);
      this.buscarUsuarios();
    }
    else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}