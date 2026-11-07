import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ClientePipe } from '../cliente-pipe';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',

  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule, 
    ClientePipe,

  ],
})
export class Reserva implements OnInit {

  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  
  formularioReserva: FormGroup;
  reservas: any = [];
  clientes: any = [];
  funciones: any = []; 

  cantidadEntradas: number = 1;
  totalAPagar: number = 0;
  funcionSeleccionada: any = null;

  constructor() {

    this.formularioReserva = this.fb.group({
      idFuncion: ['', [Validators.required]],
      idCliente: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buscarTodasLasReservas(); 
    this.buscarFunciones();        
    this.buscarClientes(); 
  }

  buscarFunciones() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.cdr.detectChanges();
      }
    );
  }

  buscarClientes() {
    this.http.get("http://localhost:8080/cliente/buscar").subscribe(
      data => {
        this.clientes = data;
        this.cdr.detectChanges();
      }
    );
  }

  FuncionCambiar(event: any) {
    const idSeleccionado = Number(event.target.value);
    this.funcionSeleccionada = this.funciones.find((f: any) => f.idFuncion === idSeleccionado);
    this.calcularTotal();
  }

  calcularTotal() {
    if (this.funcionSeleccionada) {
      const precio = this.funcionSeleccionada.precioEntrada;
      this.totalAPagar = this.cantidadEntradas * precio;
    } else {
      this.totalAPagar = 0;
    }
    this.cdr.detectChanges();
  }

  buscarTodasLasReservas() {
    this.http.get("http://localhost:8080/reserva/buscar").subscribe(
      data => {
        this.reservas = data;
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
    if (this.formularioReserva.invalid) {
      this.formularioReserva.markAllAsTouched();
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    
    let nuevaReserva = {
      idCliente: Number(this.formularioReserva.value.idCliente),
      idFuncion: Number(this.formularioReserva.value.idFuncion),
      cantidadEntradas: this.cantidadEntradas,
      totalAPagar: this.totalAPagar,
      fechaReserva: new Date()
    };

    this.http.post("http://localhost:8080/reserva", nuevaReserva).subscribe(
      retorno => {
        this.verificarReserva(retorno);
        this.buscarTodasLasReservas(); 
      },
      error => {
        console.error("Error del Servidor:", error);
        alert("Ocurrió un error al enviar la reserva.");
      }
    );
  }

  verificarReserva(respuesta: any) {
    if (respuesta && (respuesta.idReserva )) {
      alert("¡Reserva realizada con éxito!");
      this.formularioReserva.reset();
      this.cantidadEntradas = 1;
      this.funcionSeleccionada = null;
      this.totalAPagar = 0;
    } else {
      alert("No se pudo procesar la reserva.");
    }
  }
}