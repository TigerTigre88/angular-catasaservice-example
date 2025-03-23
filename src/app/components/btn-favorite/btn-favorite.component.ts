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

/**
 * Favorite button component
 *
 * @export
 * @class BtnFavoriteComponent
 * @typedef {BtnFavoriteComponent}
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'app-btn-favorite',
  imports: [CommonModule],
  templateUrl: './btn-favorite.component.html',
  styleUrl: './btn-favorite.component.css',
})
export class BtnFavoriteComponent implements OnInit, OnChanges {
  /**
   * Is favorite input property. Since this is a dummy component it doesnt hold any state.
   *
   * @type {boolean}
   */
  @Input() isFavorite: boolean = false;
  /**
   * Related local property for isFavorite
   *
   * @protected
   * @type {boolean}
   */
  protected isFavoriteClone: boolean = false;
  /**
   * Index
   *
   * @type {number}
   */
  @Input() index: number = -1;
  /**
   * Event emitter for button click event
   *
   * @type {EventEmitter<{ isFavorite: boolean; index: number }>}
   */
  @Output() isFavorite$: EventEmitter<{ isFavorite: boolean; index: number }> =
    new EventEmitter<{ isFavorite: boolean; index: number }>();

  /** On init hook */
  ngOnInit(): void {
    this.isFavoriteClone = this.isFavorite;
  }

  /**
   * On change hook
   *
   * @param {SimpleChanges} changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['isFavorite'] &&
      changes['isFavorite'].currentValue
    ) {
      this.isFavoriteClone = changes['isFavorite'].currentValue;
    }
  }

  /**
   * Toggle favorite event
   *
   * @protected
   */
  protected toggleFavorite() {
    this.isFavoriteClone = !this.isFavoriteClone;

    this.isFavorite$.emit({
      isFavorite: this.isFavoriteClone,
      index: this.index,
    });
  }
}
