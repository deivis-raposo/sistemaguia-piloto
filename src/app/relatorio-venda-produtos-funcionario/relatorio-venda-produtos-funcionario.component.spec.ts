import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendaProdutosFuncionarioComponent } from './relatorio-venda-produtos-funcionario.component';

describe('RelatorioVendaProdutosFuncionarioComponent', () => {
  let component: RelatorioVendaProdutosFuncionarioComponent;
  let fixture: ComponentFixture<RelatorioVendaProdutosFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendaProdutosFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendaProdutosFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
