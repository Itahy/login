import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-editar-producto',
  imports: [MatDialogModule, MatInputModule, CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto {
  productoEditado: any;

  constructor(
    public dialogRef: MatDialogRef<EditarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Hacer una copia editable
    this.productoEditado = { ...data };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.productoEditado);
  }
}
