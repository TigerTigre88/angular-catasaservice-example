import { Component, OnInit } from '@angular/core';
import { ImageComponent } from 'src/app/components/image/image.component';
import { CatPicture } from 'src/app/types/cat';
@Component({
  selector: 'app-favorites',
  imports: [ImageComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  protected favoriteCats: Array<CatPicture> = [];

  ngOnInit(): void {
    this.favoriteCats = JSON.parse(localStorage.getItem('favorite') || '[]');
  }
}
