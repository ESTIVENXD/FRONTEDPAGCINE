import { Component,ChangeDetectorRef, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonItem, IonLabel, IonList } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PeliculaPipe } from '../pelicula-pipe';
import { SalaPipe } from '../sala-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.page.html',
  styleUrls: ['./funcion.page.scss'],
  imports: [IonList, IonHeader, IonToolbar, 
    IonTitle, IonContent, 
    IonItem, IonLabel, IonList, FormsModule, CommonModule, PeliculaPipe, SalaPipe],
})
export class FuncionPage {
  private readonly http:HttpClient;
  private router = inject(Router);

  funciones:any = [];
  peliculas:any = [];
  salas:any = [];

  constructor(http:HttpClient, private cdr : ChangeDetectorRef) {
    this.http = http;
    this.buscarFunciones();
    this.buscarPeliculas();
    this.buscarSalas();
  }

  buscarFunciones(){
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.cdr.detectChanges();
      }
    )
  }
    buscarPeliculas(){
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.cdr.detectChanges();
      }
    )
  }
  buscarSalas(){
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {
        this.salas = data;
        this.cdr.detectChanges();
      }
    )
  }

    verReservas (funcion:any){
    this.router.navigate(['/tabs/reserva/',funcion.idFuncion]);
  }
}


