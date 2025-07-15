import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule, 
    MatIconModule
],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css'
})
export class PerfilUsuario implements OnInit {
  
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  nombreUsuario = '';
  correoUsuario = '';
  imagenPerfil = '';

  ngOnInit() {
  const usuarioGuardado = localStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);

    // Rellenar el formulario con nombre, email
    this.usuarioForm.patchValue({
      nombre: usuario.name || '',
      email: usuario.email || '',
      password: usuario.password || ''
    });

    // Mostrar en variables para UI
    this.nombreUsuario = usuario.name || 'Usuario';
    this.correoUsuario = usuario.email || '';
    this.imagenPerfil = usuario.image || '/assets/default-avatar.png';
  }
}

  guardarCambios() {
  if (this.usuarioForm.valid) {
    const datosActualizados = this.usuarioForm.value;
    const usuarioOriginal = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');

    const usuarioActualizado = {
      ...usuarioOriginal,
      name: datosActualizados.nombre,
      email: datosActualizados.email,
      image: usuarioOriginal.image,// mantenemos la imagen actual, o la actualizas si quieres
      password: datosActualizados.password
    };

    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
    alert('Datos actualizados correctamente.');
  } else {
    alert('Por favor completa todos los campos obligatorios.');
  }
}

mostrarPassword = false;

toggleMostrarPassword() {
  this.mostrarPassword = !this.mostrarPassword;
}

}
