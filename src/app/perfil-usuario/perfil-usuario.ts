import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";

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
    MatToolbarModule
],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css'
})
export class PerfilUsuario implements OnInit {
  
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      usuario: ['']
    });
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuarioForm.patchValue({
        nombre: usuario.name.firstname || '',
        apellido: usuario.name.lastname || '',
        email: usuario.email || '',
        telefono: usuario.phone || '',
        usuario: usuario.username || ''
      });
    }
  }

  guardarCambios() {
    if (this.usuarioForm.valid) {
      const datosActualizados = this.usuarioForm.value;

      // Actualiza el localStorage con los nuevos datos:
      const usuarioOriginal = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
      const usuarioActualizado = {
        ...usuarioOriginal,
        name: {
          firstname: datosActualizados.nombre,
          lastname: datosActualizados.apellido
        },
        email: datosActualizados.email,
        phone: datosActualizados.telefono,
        username: datosActualizados.usuario
      };

      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
      alert('Datos actualizados correctamente.');
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }
}
