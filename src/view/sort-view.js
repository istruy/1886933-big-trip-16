import AbstractView from './abstract-view.js';
import { SORT_TYPES } from '../const.js';

const createSortTemplate = (typeSort) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${typeSort === 'Day' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day" data-sort-type="${SORT_TYPES.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${typeSort === 'Time' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SORT_TYPES.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${typeSort === 'Price' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SORT_TYPES.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offers" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType = 'Day') {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortClickHandler = (callback) => {
    this._callback.sortClickCallback = callback;
    this.element.addEventListener('click', this.#sortClickHandler);
  }

  #sortClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();

    this._callback.sortClickCallback(evt.target.dataset.sortType);
  }

}
