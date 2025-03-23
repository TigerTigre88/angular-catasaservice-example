import { Component, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'src/app/components/image/image.component';
import { BtnFavoriteComponent } from '../../components/btn-favorite/btn-favorite.component';
import { CatPicture } from 'src/app/types/cat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, ImageComponent, BtnFavoriteComponent],
})
export class DashboardComponent {
  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this._offset += 30;
      this._getCats(this._offset);
    }
  }

  protected catList: Array<CatPicture> = [];
  private _offset: number = 0;
  protected favoritesIds: Array<string> = [];

  constructor(private api: ApiService) {
    this._getCats();
  }

  private _getCats(offset: number = 0): void {
    this.api.getCats(offset).subscribe((x) => {
      if (x) {
        this.catList = [...this.catList, ...x];
        this.checkIsFavorite(this.catList);
      }
    });
  }

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

  protected onFavoriteToggle(event: { isFavorite: boolean; index: number }) {
    const storageFavorites = JSON.parse(
      localStorage.getItem('favorite') || '[]'
    ) as Array<CatPicture>;

    const index = storageFavorites
      .map((x) => x.id)
      .findIndex((y) => this.catList[event.index].id === y);

    if (event.isFavorite) {
      if (index === -1) {
        storageFavorites.push(this.catList[event.index]);
      }
    } else {
      if (index !== -1) {
        storageFavorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorite', JSON.stringify(storageFavorites));
  }
}
