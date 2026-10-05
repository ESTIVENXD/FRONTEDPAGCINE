import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-anuncio',
  styleUrl: './anuncio.css',
  templateUrl: './anuncio.html',
})
export class Anuncio implements  OnInit {

  formularioAnuncio:FormGroup;
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;

  anuncios:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    this.formularioAnuncio = this.fb.group(
      {
        titulo:['',[Validators.required]],
        descripcion:['',[Validators.required]],
        imagen:['']
      }
    );
    this.http = http;
    this.cdr = cdr;
  }
  ngOnInit(): void {
    this.buscarAnuncios();    
  }
  buscarAnuncios(){
    this.http.get("http://localhost:8080/anuncio/buscar").subscribe(
      data => {this.anuncios=data 
      this.cdr.detectChanges();
      }
    )
  }

  agregarImagen(event:any){
    const archivo = event.target.files[0];
    if (archivo){
      const lector = new FileReader();
      lector.onload = () => {
        this.formularioAnuncio.patchValue({imagen: lector.result });
        this.cdr.detectChanges(); 
      };
      lector.readAsDataURL(archivo);
      
    }
    
  }

  guardarAnuncio(){
    if (this.formularioAnuncio.valid){
      let temp = {...this.formularioAnuncio.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/anuncio",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  mostrar (data:any){
    if (data?.idAnuncio){
      alert("Anuncio creado con el id: "+data.idAnuncio);
      this.buscarAnuncios();
    }
    else{
      alert("Error al crear Anuncio, exsite un problema en el servidor.")
    }
  }
}
