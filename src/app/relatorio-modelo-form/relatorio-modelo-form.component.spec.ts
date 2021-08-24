import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioModeloFormComponent } from './relatorio-modelo-form.component';

describe('RelatorioModeloFormComponent', () => {
  let component: RelatorioModeloFormComponent;
  let fixture: ComponentFixture<RelatorioModeloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioModeloFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioModeloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
