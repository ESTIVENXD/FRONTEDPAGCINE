import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteVentas } from './reporte-ventas';

describe('ReporteVentas', () => {
  let component: ReporteVentas;
  let fixture: ComponentFixture<ReporteVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteVentas],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
