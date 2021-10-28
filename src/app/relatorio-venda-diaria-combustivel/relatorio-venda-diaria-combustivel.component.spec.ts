import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendaDiariaCombustivelComponent } from './relatorio-venda-diaria-combustivel.component';

describe('RelatorioVendaDiariaCombustivelComponent', () => {
  let component: RelatorioVendaDiariaCombustivelComponent;
  let fixture: ComponentFixture<RelatorioVendaDiariaCombustivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendaDiariaCombustivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendaDiariaCombustivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
