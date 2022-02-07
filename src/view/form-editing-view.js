import { PointTypes, PointTypesNames } from '../const.js';
import { getItemById, getItemByName } from '../utils/common.js';
import { getYearMonthDaySlashFormat, getItemByType } from '../utils/point.js';
import SmartView from './smart-view.js';
import { deleteItem } from '../utils/common.js';
import flatpickr from 'flatpickr';
import he from 'he';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createFormEditingTemplate = (data) => {

  const { basePrice, dateFrom, dateTo, destination, checkedOffers, type, pointDestination,
    newDescription, newPictures, offersWithType, allDestinations,
    isDisabled, isSaving, isDeleting, } = data;
  const { name } = destination;

  const isSubmitDisabled = (pointDestination === '' || basePrice === '') || (basePrice === '0') || (dateFrom > dateTo) ? 'disabled' : '';

  const getDestination = () => getItemByName(allDestinations, name);

  const getDestinationTemplate = () => {
    let destinations = '';
    for (const el of Object.values(allDestinations)) {
      destinations += `<option value='${el.name}'></option>`;
    }
    return destinations;
  };

  const getInfoAboutCity = () => {

    const destinationPoint = getDestination();

    let newPointDescription = destinationPoint.description;
    let newPointPictures = destinationPoint.pictures;

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                    value="${getPointDestination()}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''}>
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(basePrice.toString())}"  ${isDisabled ? 'disabled' : ''}>
      </div >

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled}>
      ${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
      ${isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header >
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
  #datepickerDateFrom = null;
  #datepickerDateTo = null;
  #offers = [];
  #destinations = [];

  constructor(offers, destinations, point) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this._data = FormEditingView.parsePointToData(point, this.#offers, this.#destinations);

    this.#setInnerHandlers();
    this.setDatepickerDateFrom();
    this.setDatepickerDateTo();
  }

  get template() {
    return createFormEditingTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }
    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }

  restoreHandlers() {
    this.#setInnerHandlers();
    this.setDatepickerDateTo();
    this.setDatepickerDateFrom();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeTypeRouteHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
  }

  setHideClickHandler = (callback) => {
    this._callback.hideClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#hideClickHandler);
  }

  #hideClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.hideClick();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDatepickerDateFrom = () => {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        ['time_24hr']: true
      }
    );
  }

  setDatepickerDateTo = () => {
    this.#datepickerDateTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        ['time_24hr']: true
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate
    });
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

  setHideClickHandler = (callback) => {
    this._callback.hideClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#hideClickHandler);
  }

  #hideClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.hideClick();
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
    const newDestination = this.#getNewDestination(evt.target.value);
    if (newDestination === '') {
      this.updateData({
        pointDestination: '',
      });
    } else {
      this.updateData({
        pointDestination: newDestination.name,
        newPictures: newDestination.pictures,
        newDescription: newDestination.description
      });
    }
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
    allDestinations: destinations,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
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
    delete point.allDestinations;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
