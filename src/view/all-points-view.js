import AbstractView from './abstract-view.js';

const createTripEventsContainer = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventsView extends AbstractView {
  get template() {
    return createTripEventsContainer();
  }
}
