import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Menu } from './menu/menu';

@Component({
  imports: [FormsModule, RouterOutlet, Menu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Fronted');
  saludar:string = " ";
}
