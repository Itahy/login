import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaBienvenido } from './pagina-bienvenido';

describe('PaginaBienvenido', () => {
  let component: PaginaBienvenido;
  let fixture: ComponentFixture<PaginaBienvenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaBienvenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaBienvenido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
