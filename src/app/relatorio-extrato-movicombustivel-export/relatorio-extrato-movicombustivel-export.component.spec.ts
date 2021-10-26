import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioExtratoMovicombustivelExportComponent } from './relatorio-extrato-movicombustivel-export.component';

describe('RelatorioExtratoMovicombustivelExportComponent', () => {
  let component: RelatorioExtratoMovicombustivelExportComponent;
  let fixture: ComponentFixture<RelatorioExtratoMovicombustivelExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioExtratoMovicombustivelExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioExtratoMovicombustivelExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
