import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredorComponent } from './credor.component';

describe('CredorComponent', () => {
  let component: CredorComponent;
  let fixture: ComponentFixture<CredorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
