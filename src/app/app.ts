import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [RouterOutlet, MatDialogModule, FormsModule],
  template: `<router-outlet></router-outlet>`,  
  styleUrl: './app.css'
})
export class App {
}
export class AppModule { 
}

