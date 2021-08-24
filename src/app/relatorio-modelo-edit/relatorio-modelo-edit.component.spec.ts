import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioModeloEditComponent } from './relatorio-modelo-edit.component';

describe('RelatorioModeloEditComponent', () => {
  let component: RelatorioModeloEditComponent;
  let fixture: ComponentFixture<RelatorioModeloEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioModeloEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioModeloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
