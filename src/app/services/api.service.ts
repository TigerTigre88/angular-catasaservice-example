import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, switchMap } from 'rxjs';
import { CatPicture } from '../types/cat';

/**
 * API service
 *
 * @export
 * @class ApiService
 * @typedef {ApiService}
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Endpoint
   *
   * @private
   * @type {string}
   */
  private baseUrl = 'https://cataas.com/';

  /**
   * Creates an instance of ApiService.
   *
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * Get cats
   *
   * @param {number} [offset=0]
   * @returns {*}
   */
  getCats(offset = 0) {
    return this.http
      .get<Array<Partial<CatPicture>>>(this.baseUrl + 'api/cats', {
        params: { limit: 30, skip: offset },
      })
      .pipe(
        switchMap((cats) =>
          forkJoin(
            cats.map((cat: Partial<CatPicture>) =>
              this.http.get<CatPicture>(`${this.baseUrl}cat/${cat.id}`)
            )
          )
        )
      );
  }
}
