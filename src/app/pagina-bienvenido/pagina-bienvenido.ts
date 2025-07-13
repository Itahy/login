
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoModal } from '../logo-modal/logo-modal';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-pagina-bienvenido',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    MatInputModule, 
    FormsModule,
    MatTableModule,
],
  templateUrl: './pagina-bienvenido.html',
  styleUrl: './pagina-bienvenido.css'
})
export class PaginaBienvenido implements OnInit {

  constructor(private router: Router) {}

  private http = inject(HttpClient);
  public dialog = inject(MatDialog);
  public mensajeBienvenida: string = '';
  public nombreUsuario: string | null = null;

  productos: any[] = [];

  ngOnInit() {
  const usuarioStr = localStorage.getItem('usuarioLogueado');

  if (usuarioStr) {
    const usuario = JSON.parse(usuarioStr);
    this.nombreUsuario = usuario.name?.firstname || 'Invitado';
  }

  this.http.get<any>('https://dummyjson.com/products').subscribe({
    next: data => {
      this.productos = data.products.slice(0, 9);
    },
    error: error => {
      console.error('Error al obtener los productos:', error);
    }
  });
}

  abrirLogoModal() {
    this.dialog.open(LogoModal, {
      width: '600px' // Ancho del modal
    });
  }
  cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  this.router.navigate(['/iniciar-sesion']);
}

  mostrarMensajeBienvenida() {
    if (this.nombreUsuario) {
      this.mensajeBienvenida = `¡Bienvenido, ${this.nombreUsuario}!`;
    } else {
      this.mensajeBienvenida = '¡Bienvenido a nuestra tienda!';
    }
  }

  filtro: string = '';
  columnasTabla: string[] = ['imagen', 'titulo', 'descripcion', 'precio', 'acciones'];


productosFiltrados() {
  if (!this.filtro) return this.productos;
  const filtroLower = this.filtro.toLowerCase();
  return this.productos.filter(producto =>
    producto.title.toLowerCase().includes(filtroLower) ||
    producto.description.toLowerCase().includes(filtroLower)
  );
}

editarProducto(producto: any) {
  alert(`Simulando edición del producto: ${producto.title}`);
  console.log('Editar producto:', producto);
}

eliminarProducto(producto: any) {
  const confirmacion = confirm(`¿Estás seguro de que quieres eliminar "${producto.title}"?`);
  if (confirmacion) {
    // Simulación: quitarlo del arreglo local
    this.productos = this.productos.filter(p => p.id !== producto.id);
    alert(`Producto "${producto.title}" eliminado (simulado).`);
  }
}

}
