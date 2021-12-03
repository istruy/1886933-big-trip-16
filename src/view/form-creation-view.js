export const createFormCreationTemplate = (pointRoute = {}) => {

  const { typeRoute, pointDestination, offers, dateTime } = pointRoute;
  const { info, points } = pointsDestination;

  const datetime1 = dateTime.format('DD/MM/YY HH:mm');
  const datetime2 = dateTime.add('30', 'minute').format('DD/MM/YY HH:mm');

  const getDestinationTemplate = () => {
    let destinations = '';
    for (let i = 0; i < points.length; i++) {
      destinations += `<option value="${points[i]}"></option>`;
    }
    return destinations;
  };

  const getInfoAboutCity = () => (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${info[0]}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      <img class="event__photo" src="${info[1]}" alt="Event photo">
      <img class="event__photo" src="${info[2]}" alt="Event photo">`
  );

  const getOffers = () => {
    let offerElement = '';
    for (const element of offers) {
      offerElement += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${element.getNameOffer()}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${element.getPrice()}</span>
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

  const getActiveTypeRoute = () => (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${typeRoute === 'Taxi' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${typeRoute === 'Bus' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${typeRoute === 'Train' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${typeRoute === 'Ship' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${typeRoute === 'Drive' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${typeRoute === 'Flight' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${typeRoute === 'Check-in' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${typeRoute === 'Sightseeing' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${typeRoute === 'Restaurant' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>`
  );

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${typeRoute}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                      ${getActiveTypeRoute()}
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${typeRoute}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${getDestinationTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datetime1}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datetime2}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
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
              </form>`;
};
