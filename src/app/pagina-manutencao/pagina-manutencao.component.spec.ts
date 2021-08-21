import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaManutencaoComponent } from './pagina-manutencao.component';

describe('PaginaManutencaoComponent', () => {
  let component: PaginaManutencaoComponent;
  let fixture: ComponentFixture<PaginaManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaManutencaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
