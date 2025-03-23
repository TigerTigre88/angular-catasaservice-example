import { Component, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'src/app/components/image/image.component';
import { BtnFavoriteComponent } from '../../components/btn-favorite/btn-favorite.component';
import { CatPicture } from 'src/app/types/cat';

/**
 * Dashboard page component
 *
 * @export
 * @class DashboardComponent
 * @typedef {DashboardComponent}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, ImageComponent, BtnFavoriteComponent],
})
export class DashboardComponent {
  /** Hostlistener for infinite scroll*/
  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this._offset += 30;
      this._getCats(this._offset);
    }
  }

  /**
   * Cat pictures
   *
   * @protected
   * @type {Array<CatPicture>}
   */
  protected catList: Array<CatPicture> = [];
  /**
   * Offset for API call
   *
   * @private
   * @type {number}
   */
  private _offset: number = 0;
  /**
   * Favorites cat ID
   *
   * @protected
   * @type {Array<string>}
   */
  protected favoritesIds: Array<string> = [];

  /**
   * Creates an instance of DashboardComponent.
   *
   * @constructor
   * @param {ApiService} api 
   */
  constructor(private api: ApiService) {
    this._getCats();
  }

  /**
   * Get cats
   *
   * @private
   * @param {number} [offset=0] 
   */
  private _getCats(offset: number = 0): void {
    this.api.getCats(offset).subscribe((x) => {
      if (x) {
        this.catList = [...this.catList, ...x];
        this.checkIsFavorite(this.catList);
      }
    });
  }

  /**
   * Check if cat is in favorite cat list from localstorage
   *
   * @private
   * @param {Array<CatPicture>} catList 
   */
  private checkIsFavorite(catList: Array<CatPicture>) {
    const storedCats = JSON.parse(
      localStorage.getItem('favorite') || '[]'
    ) as Array<CatPicture>;

    catList.forEach((cat) => {
      if (storedCats.map((x) => x.id).includes(cat.id)) {
        this.favoritesIds.push(cat.id);
      }
    });
  }

  /**
   * On favorite button click even.
   *
   * @protected
   * @param {{ isFavorite: boolean; index: number }} event 
   */
  protected onFavoriteToggle(event: { isFavorite: boolean; index: number }) {
    const storageFavorites = JSON.parse(
      localStorage.getItem('favorite') || '[]'
    ) as Array<CatPicture>;

    const index = storageFavorites
      .map((x) => x.id)
      .findIndex((y) => this.catList[event.index].id === y);

    if (event.isFavorite) {
      // Add if not present
      if (index === -1) {
        storageFavorites.push(this.catList[event.index]);
      }
    } else {
      // Remove if is present
      if (index !== -1) {
        storageFavorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorite', JSON.stringify(storageFavorites));
  }
}
