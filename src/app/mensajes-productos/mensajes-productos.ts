import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";

@Component({
  standalone: true,
  selector: 'app-mensajes-productos',
  imports: [CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,],
  templateUrl: './mensajes-productos.html',
  styleUrl: './mensajes-productos.css'
})
export class MensajesProductos {
  constructor(
    public dialogRef: MatDialogRef<MensajesProductos>,
    @Inject(MAT_DIALOG_DATA) public producto: any
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}
