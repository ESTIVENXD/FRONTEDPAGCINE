import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuncionPage } from './funcion.page';

describe('FuncionPage', () => {
  let component: FuncionPage;
  let fixture: ComponentFixture<FuncionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
