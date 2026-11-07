import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-reporte-ventas',
  styleUrl: './reporte-ventas.css', 
  templateUrl: './reporte-ventas.html',
})
export class ReporteVentas implements OnInit {

  formularioReporte: FormGroup;
  private readonly http: HttpClient;
  private readonly cdr: ChangeDetectorRef;
  datosReporte: any = [];

  constructor(private fb: FormBuilder, http: HttpClient, cdr: ChangeDetectorRef) {

    this.formularioReporte = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      tipoReporte: ['funcion', [Validators.required]] 
    });
    this.http = http;
    this.cdr = cdr;
  }

  ngOnInit(): void {
  
  }

  generarReporte() {
    if (this.formularioReporte.valid) {
      const valores = this.formularioReporte.value;

      const inicioFormateado = `${valores.fechaInicio}T00:00:00`;
      const finFormateado = `${valores.fechaFin}T23:59:59`;

      const params = new HttpParams()
        .set('inicio', inicioFormateado)
        .set('fin', finFormateado)
        .set('tipo', valores.tipoReporte);

      this.http.get("http://localhost:8080/reserva/reporte", { params }).subscribe(
        data => {
          this.datosReporte = data;
          this.cdr.detectChanges();
        },
        error => {
          console.error("Error al consultar el reporte", error);
          alert("Ocurrió un error al conectar con el servidor.");
        }
      );
    } else {
      alert("Por favor, completa todos los campos del formulario.");
    }
  }
}