import AbstractView from './abstract-view.js';

const createBoardContainer = () => (
  `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

export default class BoardView extends AbstractView {
  get template() {
    return createBoardContainer();
  }
}
