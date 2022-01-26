import { PointTypes, PointTypesNames, PointDestination } from '../const.js';
import { getItemById, deleteItem, getItemByName } from '../utils/common.js';
import { getYearMonthDaySlashFormat } from '../utils/point.js';
import SmartView from './smart-view.js';
import { getItemByType } from '../utils/point.js';

const createFormEditingTemplate = (data) => {

  const { basePrice, dateFrom, dateTo, destination, checkedOffers, type, newDestination, offersWithType, allDestinations } = data;
  const { description, name, pictures } = destination;

  const getDestination = () => {
    return getItemByName(allDestinations, name);
  }

  const getDestinationTemplate = () => {
    let destinations = '';
    for (const el of Object.values(PointDestination)) {
      destinations += `<option value="${el}"></option>`;
    }
    return destinations;
  };

  const getInfoAboutCity = () => {
    const destinations = getDestination();
    const pointDescription = destinations.description;
    const pointPictures = destinations.pictures;

    if (newDestination.description !== undefined && newDestination.pictures !== undefined) {
      pointDescription = newDestination.description;
      pointPictures = newDestination.pictures;
    }

    let info = `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDescription}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">`;

    for (const element of pointPictures) {
      const { src } = element;
      info += `<img class="event__photo" src="${src}" alt="Event photo">`;
    }
    return info;
  };

  const getPointDestination = () => newDestination.name === undefined ? name : newDestination.name;

  const checkOfferChecked = (id) => {
    const item = getItemById(checkedOffers, id);
    return item !== -1;
  };

  const getOffers = () => {
    let offerElement = '';

    const possibleOffers = getItemByType(type, offersWithType).offers;

    for (const offer of possibleOffers) {
      const { id, title, price } = offer;
      let stateOffer = '';
      if (checkedOffers !== undefined && checkedOffers.length !== 0) {
        const t = checkOfferChecked(id);
        stateOffer = t ? 'checked' : '';
      }

      offerElement += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${stateOffer}>
          <label class="event__offer-label" for="event-offer-luggage-${id}" data-id=${id}>
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
    for (const pointType of Object.values(PointTypes)) {
      typeRoutes += ` <div class="event__type-item">
      <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${type === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${PointTypesNames[pointType]}</label>
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getPointDestination()}" list="destination-list-1">
                    <datalist id = "destination-list-1">
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

      <button class="event__save-btn  btn  btn--blue" type="submit" ${pointDestination === '' || basePrice === '' ? 'disabled' : ''}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${getOffers()}
      <section class="event__section  event__section--destination">
        ${getInfoAboutCity()}
      </div>
  </div>
                  </section >
                </section >
              </form >
              </li > `;
};

export default class FormEditingView extends SmartView {
  #offers = [];
  #destinations = [];

  constructor(offers, destinations, point) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this._data = FormEditingView.parsePointToData(point, this.#offers, this.#destinations);

    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditingTemplate(this._data);
  }

  restoreHandlers() {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeTypeRouteHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditingView.parseDataToPoint(this._data));
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
    const type = evt.target.parentElement.querySelector('input').value;
    this.updateData({
      type,
      checkedOffers: []
    });
  }

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      newDestination: this.#getNewDestination(evt.target.value),
    });
  }

  #getNewDestination = (nameNewldDestination) => {
    const checkedDestination = this._data.allDestinations.find((it) => it.name === nameNewldDestination);
    return checkedDestination;
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    });
  }

  #getOfferChecked = (evt) => {
    if (evt.target.dataset.id === undefined) {
      return evt.target.parentElement.dataset.id;
    }
    return evt.target.dataset.id;
  }

  #addOrDeleteClickedOffers = (id) => {
    const offersByType = getItemByType(this._data.type, this._data.offersWithType);
    const checkedOffer = offersByType.offers.find((it) => it.id === Number(id));

    const index = this._data.checkedOffers.findIndex((item) => item.id === checkedOffer.id);
    if (index === -1) {
      this._data.checkedOffers.push(checkedOffer);
    } else {
      this._data.checkedOffers = deleteItem(this._data.checkedOffers, checkedOffer);
    }
  }

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    this.#addOrDeleteClickedOffers(this.#getOfferChecked(evt));
    this.updateData({
      checkedOffers: this._data.checkedOffers
    });
  }

  reset = (point) => {
    this.updateData(FormEditingView.parsePointToData(point, this.#offers, this.#destinations));
  }

  static parsePointToData = (point, offers, destinations) => ({
    ...point,
    pointDestination: point.destination.name,
    checkedOffers: point.offers.slice(0),
    offersWithType: offers,
    allDestinations: destinations
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    if (point.pointDestination !== point.destination.name) {
      point.destination.name = point.pointDestination;
    }

    if (JSON.stringify(point.offers) !== JSON.stringify(point.checkedOffers)) {
      point.offers = point.checkedOffers.slice(0);
    }

    delete point.newDestination;
    delete point.checkedOffers;
    delete point.allDestinations;

    return point;
  }
}
