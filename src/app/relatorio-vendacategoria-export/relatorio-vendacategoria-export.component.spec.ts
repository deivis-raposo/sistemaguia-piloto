import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendacategoriaExportComponent } from './relatorio-vendacategoria-export.component';

describe('RelatorioVendacategoriaExportComponent', () => {
  let component: RelatorioVendacategoriaExportComponent;
  let fixture: ComponentFixture<RelatorioVendacategoriaExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendacategoriaExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendacategoriaExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
