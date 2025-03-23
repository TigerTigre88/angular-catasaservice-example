import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-btn-favorite',
  imports: [CommonModule],
  templateUrl: './btn-favorite.component.html',
  styleUrl: './btn-favorite.component.css',
})
export class BtnFavoriteComponent implements OnInit, OnChanges {
  @Input() isFavorite: boolean = false;
  protected isFavoriteClone: boolean = false;
  @Input() index: number = -1;
  @Output() isFavorite$: EventEmitter<{ isFavorite: boolean; index: number }> =
    new EventEmitter<{ isFavorite: boolean; index: number }>();

  ngOnInit(): void {
    this.isFavoriteClone = this.isFavorite;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['isFavorite'] &&
      changes['isFavorite'].currentValue
    ) {
      this.isFavoriteClone = changes['isFavorite'].currentValue;
    }
  }

  protected toggleFavorite() {
    this.isFavoriteClone = !this.isFavoriteClone;

    this.isFavorite$.emit({
      isFavorite: this.isFavoriteClone,
      index: this.index,
    });
  }
}
