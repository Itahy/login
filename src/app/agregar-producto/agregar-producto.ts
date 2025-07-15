import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css'
})
export class AgregarProducto {
  producto: any = {
    thumbnail: '',
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
    discountPercentage: ''
  };

  constructor(private dialogRef: MatDialogRef<AgregarProducto>) {}

  guardarProducto() {
    this.producto.id = Date.now(); // ID simulado único
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
