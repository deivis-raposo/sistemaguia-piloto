import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendaDiariaProdutosExportComponent } from './relatorio-venda-diaria-produtos-export.component';

describe('RelatorioVendaDiariaProdutosExportComponent', () => {
  let component: RelatorioVendaDiariaProdutosExportComponent;
  let fixture: ComponentFixture<RelatorioVendaDiariaProdutosExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendaDiariaProdutosExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendaDiariaProdutosExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
