import { PointTypes, PointTypesNames, PointDestination } from '../const.js';
import { getYearMonthDaySlashFormat, getItemByType } from '../utils/point.js';
import { getDestination} from '../mock/mock.js';
import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import { getRandomInteger } from '../utils/common.js';

const BLANK_POINT = {
  basePrice: 100,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: getDestination(),
  id: getRandomInteger(100, 600),
  isFavorite: false,
  offers: [],
  type: PointTypes.Bus
};

const createFormCreationTemplate = (data) => {

  const { basePrice, dateFrom, dateTo, destination, checkedOffers, type, pointDestination, newDescription, newPictures, offersWithType } = data;
  const { description, name, pictures } = destination;

  const getDestinationTemplate = () => {
    let destinations = '';
    for (const el of Object.values(PointDestination)) {
      destinations += `<option value="${el}"></option>`;
    }
    return destinations;
  };

  const getInfoAboutCity = () => {
    let newPointDescription = description;
    let newPointPictures = pictures;

    if (newDescription !== undefined && newPictures !== undefined) {
      newPointDescription = newDescription;
      newPointPictures = newPictures;
    }
    let info = `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${newPointDescription}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">`;

    for (const element of newPointPictures) {
      const { src } = element;
      info += `<img class="event__photo" src="${src}" alt="Event photo">`;
    }
    return info;
  };

  const getPointDestination = () => pointDestination === undefined ? name : pointDestination;

  const checkOfferChecked = (id) => {
    const item = getItemById(checkedOffers, id);
    return item !== -1 ? true : false;
  }

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getPointDestination()}" list="destination-list-1">
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
  #offers = [];
  constructor(offers, point = BLANK_POINT) {
    super();
    this.#offers = offers;
    this._data = FormCreationView.parsePointToData(point, offers);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormCreationTemplate(this._data);
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
    const type = evt.target.parentElement.querySelector('input').value
    this.updateData({
      type,
      checkedOffers: []
    });
  }

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      pointDestination: evt.target.value,
      newPictures: this.#getNewDestination(evt.target.value).pictures,
      newDescription: this.#getNewDestination(evt.target.value).description
    });
  }

  #getNewDestination = (oldDestination) => {
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
    this.updateData(FormCreationView.parsePointToData(point, this.#offers));
  }

  static parsePointToData = (point, offers) => ({
    ...point,
    pointDestination: point.destination.name,
    checkedOffers: point.offers.slice(0),
    offersWithType: offers
  });

  static parseDataToPoint = (data) => {

    const point = { ...data };

    if (point.pointDestination !== point.destination.name) {
      point.destination.name = point.pointDestination;
    }

    if (JSON.stringify(point.offers) !== JSON.stringify(point.checkedOffers)) {
      point.offers = point.checkedOffers.slice(0);
    }

    delete point.pointDestination;
    delete point.newDescription;
    delete point.newPictures;
    delete point.checkedOffers;

    return point;
  }
}
