import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logo-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logo-modal.html',
  styleUrl: './logo-modal.css'
})

export class LogoModal {
  constructor(public dialogRef: MatDialogRef<LogoModal>) {}
  cerrar() {
    this.dialogRef.close();
  }
}
