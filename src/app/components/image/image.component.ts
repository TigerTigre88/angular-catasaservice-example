import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Card image component
 * 
 * @export
 * @class ImageComponent
 * @typedef {ImageComponent}
 */
@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
})
export class ImageComponent {
  /**
   * Image URL
   *
   * @type {string}
   */
  @Input() imgUrl: string = '';
}
