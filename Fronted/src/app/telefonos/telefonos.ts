import { Component, OnInit,ChangeDetectorRef,inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-telefonos',
  styleUrl: './telefonos.css',
  templateUrl: './telefonos.html',
})
export class Telefonos{

private route = inject(ActivatedRoute);
telefonos:any =[];
private readonly http:HttpClient;

constructor(http:HttpClient,
  private cdr : ChangeDetectorRef){
    this.http = http;
    this.buscarTelefonos(this.route.snapshot.paramMap.get("idUsuario"));
  }  
buscarTelefonos(idUsuario:any){
  this.http.get("http://localhost:8080/telefono/buscar/"+idUsuario).subscribe(
  data => {
    this.telefonos = data;
    this.cdr.detectChanges();
  }
)
}
}
