import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- importa para ngModel
import { CommonModule } from '@angular/common'; // sempre bom incluir
import { RouterModule } from '@angular/router'; // <-- importa para router-outlet
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterModule, // importa apenas o módulo
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  title = 'eventos-frontend';
}
