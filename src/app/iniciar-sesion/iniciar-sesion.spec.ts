import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { IniciarSesion } from './iniciar-sesion';

describe('IniciarSesion', () => {
  let component: IniciarSesion;
  let fixture: ComponentFixture<IniciarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesion, MatSnackBarModule],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario válido con credenciales correctas', () => {
    component.loginForm.setValue({
      email: 'biani@gmail.com',
      password: 'Biani020624'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('debería ser inválido con credenciales incorrectas', () => {
    component.loginForm.setValue({
      email: 'wrong@email.com',
      password: 'wrongpass'
    });
    expect(component.loginForm.invalid).toBeTruthy();
  });
});