import { OFFERS, TYPE_ROUTE, POINTS_DESTINATION } from '../const.js';
import { getYearMonthDaySlashFormat } from '../utils.js';
import { getOffersWithType, getDestination } from '../mock/mock.js';
import dayjs from 'dayjs';
import SmartView from './smart-view.js';

const BLANK_POINT = {
  basePrice: 100,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: POINTS_DESTINATION[0],
  id: 1,
  isFavorite: false,
  offers: {},
  type: TYPE_ROUTE[0]
};

const createFormCreationTemplate = (pointRoute = {}) => {

  const { basePrice, dateFrom, dateTo, destination, offers, type } = pointRoute;
  const { description, name, pictures } = destination;

  const getDestinationTemplate = () => {
    let destinations = '';
    for (let i = 0; i < OFFERS.length; i++) {
      destinations += `<option value="${OFFERS[i]}"></option>`;
    }
    return destinations;
  };

  const getInfoAboutCity = () => {
    let info = `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">`;

    for (const element of pictures) {
      const { src } = element;
      info += `<img class="event__photo" src="${src}" alt="Event photo">`;
    }
    return info;
  };

  const getOffers = () => {
    let offerElement = '';
    for (const element of offers) {
      const { title, price } = element;
      offerElement += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`;
    }

    return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerElement}
        </div>
      </section>`;
  };

  const getActiveType = () => {
    let typeRoutes = '';
    for (let i = 0; i < TYPE_ROUTE.length; i++) {
      typeRoutes += ` <div class="event__type-item">
      <input id="event-type-${TYPE_ROUTE[i]}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${TYPE_ROUTE[i]}" ${type === TYPE_ROUTE[i] ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${TYPE_ROUTE[i]}" for="event-type-${TYPE_ROUTE[i]}-1">${TYPE_ROUTE[i]}</label>
      </div>`;
    }
    return typeRoutes;
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                    <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${getActiveType()}
                  </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${getDestinationTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getYearMonthDaySlashFormat(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getYearMonthDaySlashFormat(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>

                <section class="event__details">
                  ${getOffers()}
                  <section class="event__section  event__section--destination">
                    ${getInfoAboutCity()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
              </li>`;
};

export default class FormCreationView extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = FormCreationView.parsePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormCreationTemplate(this._data);
  }

  restoreHandlers() {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeTypeRouteHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    //this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
  }


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormCreationView.parseDataToPoint(this._data));
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  #changeTypeRouteHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.innerHTML
    });
  }

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      pointDestination: evt.target.value
    });
  }

  static #getNewOffers = (type) => {
    const typesAndOffers = getOffersWithType();
    for (const element of typesAndOffers) {
      if (element.type === type) {
        return typesAndOffers.offers;
      }
    }
  }

  static #getNewDestination = (oldDestination) => {
    let newDestination = getDestination();
    while (oldDestination !== newDestination.name) {
      newDestination = getDestination();
    }
    return newDestination;
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    });
  }

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      isOfferChecked: evt.target.htmlFor
    });
  }

  reset = (point) => {
    this.updateData(FormCreationView.parsePointToData(point));
  }

  static parsePointToData = (point) => ({
    ...point,
    newTypeRoute: point.type,
    pointRoute: point.destination.name
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    if (point.type !== point.newTypeRoute) {
      point.type = point.newTypeRoute;
      point.offers = this.#getNewOffers(point.type);
    }

    if (point.destination.name !== point.pointRoute) {
      point.destination.name = point.pointRoute;
      const newDestination = this.#getNewDestination();
      point.destination.pictures = newDestination.pictures;
      point.destination.description = newDestination.description;
    }

    delete point.newTypeRoute;
    delete point.pointRoute;

    return point;
  }
}
