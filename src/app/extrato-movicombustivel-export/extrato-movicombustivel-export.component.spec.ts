import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoMovicombustivelExportComponent } from './extrato-movicombustivel-export.component';

describe('ExtratoMovicombustivelExportComponent', () => {
  let component: ExtratoMovicombustivelExportComponent;
  let fixture: ComponentFixture<ExtratoMovicombustivelExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoMovicombustivelExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoMovicombustivelExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
