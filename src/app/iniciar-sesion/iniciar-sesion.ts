import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSnackBarModule,
    HttpClientModule
  ],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesion {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  hidePassword = true;


  alertaMensaje: string | null = null;
  alertaTipo: 'exito' | 'error' | 'advertencia' | null = null;
  errorCorreo: string | null = null;
  errorPassword: string | null = null;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', []]
  });

  mostrarAlerta(mensaje: string, tipo: 'exito' | 'error' | 'advertencia') {
    this.alertaMensaje = mensaje;
    this.alertaTipo = tipo;
    setTimeout(() => {
      this.alertaMensaje = null;
      this.alertaTipo = null;
    }, 2000);
  }

  limpiarErrores() {
    this.errorCorreo = null;
    this.errorPassword = null;
  }

  mostrarErrorTemporal(tipo: 'correo' | 'password', mensaje: string) {
    if (tipo === 'correo') {
      this.errorCorreo = mensaje;
      setTimeout(() => { this.errorCorreo = null; }, 2000);
    } else if (tipo === 'password') {
      this.errorPassword = mensaje;
      setTimeout(() => { this.errorPassword = null; }, 2000);
    }
  }

  onSubmit() {
  this.limpiarErrores();

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.mostrarAlerta('Todos los campos son obligatorios y válidos', 'error');
    return;
  }

  const { email, password } = this.loginForm.getRawValue();

  this.http.get<any[]>('https://68743fcedd06792b9c937143.mockapi.io/api/users').subscribe({
    next: (usuarios) => {
      const usuario = usuarios.find(u => u.email === email);

      if (!usuario) {
        this.mostrarErrorTemporal('correo', 'El correo es incorrecto');
        return;
      }

      if (usuario.password !== password) {
        this.mostrarErrorTemporal('password', 'La contraseña es incorrecta');
        return;
      }

      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
      this.mostrarAlerta('¡Inicio de sesión exitoso!', 'exito');

      setTimeout(() => {
        this.router.navigate(['/pagina-bienvenido']);
      }, 1200);
    },
    error: () => {
      this.mostrarAlerta('Error al conectar con el servidor', 'error');
    }
  });
}

}