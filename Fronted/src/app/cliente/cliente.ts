import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class Cliente implements  OnInit{

  formularioCliente:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

    clientes:any =[];

    constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioCliente = this.fb.group(
      {
        nit:['',[Validators.required]],
        nombres:['',[Validators.required]],
        apellidos:['',[Validators.required]],
        email:['',[Validators.required]],
        telefono:['',[Validators.required]],
        password:['',[Validators.required]],
        fotografia:['']
      }
      );
    this.http = http;
    this.cdr = cdr;
    }
  ngOnInit(): void {
    this.buscarClientes();    
  }
    buscarClientes(){
    this.http.get("http://localhost:8080/cliente/buscar").subscribe(
      data => {this.clientes=data 
      this.cdr.detectChanges();
      }
    )
  }
    agregarFoto(event:any){
    const archivo = event.target.files[0];
    if (archivo){
      const lector = new FileReader();
      lector.onload = () => {
        this.formularioCliente.patchValue({fotografia: lector.result });
        this.cdr.detectChanges(); 
      };
      lector.readAsDataURL(archivo);
      
    }
    
  }
    guardarCliente(){
    if (this.formularioCliente.valid){
      let temp = {...this.formularioCliente.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/cliente",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

     mostrar (data:any){
    if (data?.idCliente){
      alert("Cliente creado con el id: "+data.idCliente);
      this.buscarClientes();
    }
        else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}
