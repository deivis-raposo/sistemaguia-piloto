import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovicombustivelComponent } from './movicombustivel.component';

describe('MovicombustivelComponent', () => {
  let component: MovicombustivelComponent;
  let fixture: ComponentFixture<MovicombustivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovicombustivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovicombustivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
