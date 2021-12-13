import { createElement } from '../render.js';

const createTripEventsContainer = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventsContainer();
  }

  removeElement() {
    this.#element = null;
  }

}
