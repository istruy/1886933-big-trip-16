import { getYearMonthDayFormat, getYearMonthDayHourMinuteFormat, getMonthDayFormat, getHourMinute } from '../utils/point.js';
import AbstractView from './abstract-view';

const createPointRouteTemplate = (pointRoute) => {

  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = pointRoute;
  const { name } = destination;

  const getOfferElement = () => {
    let offerElement = '';
    for (const element of offers) {
      const { title, price } = element;
      offerElement += `<li class="event__offer">
                        <span class="event__offer-title">${title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${price}</span>
                        </li>`;
    }
    return offerElement;
  };

  const isFavoritePoint =
    isFavorite
      ? 'event__favorite-btn--active'
      : '';

  return `<li class="trip-events__item">
                <div class="event">
                  <time class="event__date" datetime="${getYearMonthDayFormat(dateFrom)}">${getMonthDayFormat(dateFrom)}</time>
                  <div class="event__type">
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                  </div>
                  <h3 class="event__title">${type} ${name}</h3>
                  <div class="event__schedule">
                    <p class="event__time">
                      <time class="event__start-time" datetime="${getYearMonthDayHourMinuteFormat(dateFrom)}">${getHourMinute(dateFrom)}</time>
                      &mdash;
                      <time class="event__end-time" datetime="${getYearMonthDayHourMinuteFormat(dateTo)}">${getHourMinute(dateTo)}</time>
                    </p>
                    <p class="event__duration">30M</p>
                  </div>
                  <p class="event__price">
                    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                  </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${getOfferElement()}
                  </ul>
                  <button class="event__favorite-btn ${isFavoritePoint}" type="button">
                    <span class="visually-hidden">Add to favorite</span>
                    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                    </svg>
                  </button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </div>
              </li>`;
};

export default class PointRouteView extends AbstractView {
  #point = null;

  setEditClickHandler = (callback) => {
    this._callback.editCallback = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = () => {
    this._callback.editCallback();
  }

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointRouteTemplate(this.#point);
  }
}
