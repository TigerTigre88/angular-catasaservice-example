/**
 * Cat picture
 *
 * @export
 * @interface CatPicture
 * @typedef {CatPicture}
 */
export interface CatPicture {
  /**
   * Cat pciture object ID from API db
   *
   * @type {string}
   */
  id: string;
  /**
   * Created at
   *
   * @type {string}
   */
  created_at: string;
  /**
   * Image type
   *
   * @type {string}
   */
  mimetype: string;
  /**
   * Tags
   *
   * @type {Array<string>}
   */
  tags: Array<string>;
  /**
   * Image URL
   *
   * @type {string}
   */
  url: string;
}
