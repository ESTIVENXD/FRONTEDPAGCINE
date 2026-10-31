import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonButton, IonIcon, IonInput 
} from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClientePipe } from '../cliente-pipe';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, ticketOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  imports: [
    IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonButton, IonIcon, IonInput, FormsModule, CommonModule, ClientePipe
  ],
})
export class ReservaPage implements OnInit {

private readonly http: HttpClient;
  private route = inject(ActivatedRoute);
  
  reservas: any = [];
  clientes: any = [];
  idFuncionActual: any = null;

  cantidadEntradas: number = 1;
  totalAPagar: number = 0;
  usuarioLogueado: any = null;
  

  funcionSeleccionada: any = null;

  constructor(http: HttpClient, private cdr: ChangeDetectorRef) {
    this.http = http;
    addIcons({ addOutline, removeOutline, ticketOutline });
  }  

  ngOnInit() {
    this.idFuncionActual = this.route.snapshot.paramMap.get("idFuncion");

    if (this.idFuncionActual) {
      this.buscarReserva(this.idFuncionActual);
      this.buscarDatosFuncion(this.idFuncionActual);
    }
    this.buscarClientes();

    const usuarioString = localStorage.getItem("usuario");
    if (usuarioString) {
      this.usuarioLogueado = JSON.parse(usuarioString);
    }
  }

   buscarDatosFuncion(idFuncion: any) {
    this.http.get("http://localhost:8080/funcion/buscar/" + idFuncion).subscribe(
      (data: any) => {
        if (data) {
          this.funcionSeleccionada = data;
          this.calcularTotal();
        }
      },
      error => {
        console.error("Error directo de red con el backend. Revisar consola de Spring Boot.", error);

        this.funcionSeleccionada = { precio_entrada: 0, precioEntrada: 0 }; 
        this.calcularTotal();
      }
    );
  }

  calcularTotal() {
    if (this.funcionSeleccionada) {

      const precio = this.funcionSeleccionada.precio_entrada || this.funcionSeleccionada.precioEntrada || 0;
      this.totalAPagar = this.cantidadEntradas * precio;
    } else {
      this.totalAPagar = 0;
    }
    this.cdr.detectChanges();
  }

  buscarReserva(idFuncion: any) {
    if (idFuncion) {
      this.http.get("http://localhost:8080/reserva/buscar/" + idFuncion).subscribe(
        data => {
          this.reservas = data;
          this.cdr.detectChanges();
        }
      );
    }
  }

  buscarClientes() {
    this.http.get("http://localhost:8080/cliente/buscar").subscribe(
      data => {
        this.clientes = data;
        this.cdr.detectChanges();
      }
    );
  }

  sumarEntrada() {
    this.cantidadEntradas++;
    this.calcularTotal();
  }

  restarEntrada() {
    if (this.cantidadEntradas > 1) {
      this.cantidadEntradas--;
      this.calcularTotal();
    }
  }

  guardarReserva() {
    if (!this.usuarioLogueado) {
      alert("Error: No se detectó un usuario activo.");
      return;
    }

    let nuevaReserva = {
      idCliente: this.usuarioLogueado.idUsuario, 
      idFuncion: Number(this.idFuncionActual),
      cantidadEntradas: this.cantidadEntradas,
      totalAPagar: this.totalAPagar,
      fechaReserva: new Date()
    };

    this.http.post("http://localhost:8080/reserva", nuevaReserva).subscribe(
      retorno => {
        this.verificarReserva(retorno);
        this.buscarReserva(this.idFuncionActual);
      },
      error => {
        console.error(error);
        alert("Ocurrió un error al enviar la reserva.");
      }
    );
  }

  verificarReserva(respuesta: any) {
    if (respuesta && (respuesta.idReserva || respuesta.id_reserva)) {
      alert("¡Reserva realizada con éxito!");
      this.cantidadEntradas = 1;
      this.calcularTotal();
    } else {
      alert("No se pudo procesar la reserva.");
    }
  }
}