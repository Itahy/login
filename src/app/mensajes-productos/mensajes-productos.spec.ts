import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesProductos } from './mensajes-productos';

describe('MensajesProductos', () => {
  let component: MensajesProductos;
  let fixture: ComponentFixture<MensajesProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
