import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendacategoriaComponent } from './vendacategoria.component';

describe('VendacategoriaComponent', () => {
  let component: VendacategoriaComponent;
  let fixture: ComponentFixture<VendacategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendacategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
