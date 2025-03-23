import { Component, OnInit } from '@angular/core';
import { ImageComponent } from 'src/app/components/image/image.component';
import { CatPicture } from 'src/app/types/cat';
/**
 * Favorite page component.
 * Get favorite cats from local storage and show them.
 *
 * @export
 * @class FavoritesComponent
 * @typedef {FavoritesComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-favorites',
  imports: [ImageComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  /**
   * Cat pictures array
   *
   * @protected
   * @type {Array<CatPicture>}
   */
  protected favoriteCats: Array<CatPicture> = [];

  /** On init hook */
  ngOnInit(): void {
    this.favoriteCats = JSON.parse(localStorage.getItem('favorite') || '[]');
  }
}
