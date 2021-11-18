import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendaCartoesDiaComponent } from './relatorio-venda-cartoes-dia.component';

describe('RelatorioVendaCartoesDiaComponent', () => {
  let component: RelatorioVendaCartoesDiaComponent;
  let fixture: ComponentFixture<RelatorioVendaCartoesDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendaCartoesDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendaCartoesDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
