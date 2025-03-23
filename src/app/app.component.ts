import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Application main component.
 * Compare this component to a tree root.
 * 
 *   O <-- App component
 *  / \
 * O   O <-- Navbar & router outlet
 *      \
 *       O <-- Page component, dashboard or favorites
 *      / \
 *    ...  ... 
 * 
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
