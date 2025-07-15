
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
import { AgregarProducto } from '../agregar-producto/agregar-producto';
import { MensajesProductos } from '../mensajes-productos/mensajes-productos';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarProducto } from '../editar-producto/editar-producto';



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

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {}


  private http = inject(HttpClient);
  public mensajeBienvenida: string = '';
  public nombreUsuario: string | null = null;
  public avatarUsuario: string | null = null;

  productos: any[] = [];

  ngOnInit() {
  const usuarioStr = localStorage.getItem('usuarioLogueado');

  if (usuarioStr) {
    const usuario = JSON.parse(usuarioStr);
    this.nombreUsuario = usuario.name|| 'Invitado';
    this.avatarUsuario = usuario.image || null;
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

get productosFiltrados() {
  if (!this.filtro) return this.productos;
  const filtroLower = this.filtro.toLowerCase();
  return this.productos.filter(producto =>
    producto.title.toLowerCase().includes(filtroLower) ||
    producto.description.toLowerCase().includes(filtroLower)
  );
}


editarProducto(producto: any) {
  const dialogRef = this.dialog.open(EditarProducto, {
    width: '500px',
    data: producto
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productos = [
          ...this.productos.slice(0, index),
          resultado,
          ...this.productos.slice(index + 1)
        ];
      }
    }
  });
}



eliminarProducto(producto: any) {
  const dialogRef = this.dialog.open(ConfirmDialog, {
    data: { title: producto.title }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
      this.snackBar.open(`Producto "${producto.title}" eliminado`, 'Cerrar', {
        duration: 3000,
      });
    }
  });
}


abrirModalAgregarProducto() {
  const dialogRef = this.dialog.open(AgregarProducto, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(nuevoProducto => {
    if (nuevoProducto) {
      console.log('Producto agregado:', nuevoProducto); // Para verificar en consola
      this.productos = [nuevoProducto, ...this.productos]; 
      this.filtro = ''; 
    }
  });
}


verMasInfo(producto: any) {
  this.dialog.open(MensajesProductos, {
    width: '500px',
    data: producto
  });
}
}
