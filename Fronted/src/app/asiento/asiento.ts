import { Component, OnInit, ChangeDetectorRef,inject  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento implements OnInit {
  formularioAsiento:FormGroup;
  private route = inject(ActivatedRoute);
  private readonly http:HttpClient;
  private readonly cdr:ChangeDetectorRef;
  
  
  asientos:any =[];

  constructor (private fb:FormBuilder, http:HttpClient, cdr: ChangeDetectorRef){
    
    this.formularioAsiento = this.fb.group(
      {
        idSala:['',[Validators.required]],
        fila:['',[Validators.required]],
        numero:['',[Validators.required]]
      }
      );
    this.http = http;
    this.cdr = cdr;
    this.buscarAsientoIDSala(this.route.snapshot.paramMap.get("idSala"));

    }

    ngOnInit(): void {  
    
  }

    buscarAsientoIDSala(idSala:any){

  this.http.get("http://localhost:8080/asiento/buscar/"+idSala).subscribe(
  data => {
    this.asientos = data;
    this.cdr.detectChanges();
  }
)
}
  /* buscarAsiento(){
    this.http.get("http://localhost:8080/asiento/buscar").subscribe(
      data => {this.asientos=data 
      this.cdr.detectChanges();
      }
    )
  }*/
  guardarAsiento(){
    if (this.formularioAsiento.valid){
      let temp = {...this.formularioAsiento.value};
      temp.fechaPublicacion = new Date();
      this.http.post("http://localhost:8080/asiento",temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }
  mostrar (data:any){
    if (data?.idAsiento){
      alert("Asiento creado con el id: "+data.idAsiento);
      this.buscarAsientoIDSala(this.route.snapshot.paramMap.get("idSala"));
      
      
      
    }
    else{
      alert("Error al crear el usuario, exsite un problema en el servidor.")
    }
  }
}

