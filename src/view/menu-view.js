import { MenuItem } from '../const.js';
import AbstractView from './abstract-view.js';

const createSiteMenuTemplate = () => (
  `<div class="trip-main">
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__navigation">
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.POINTS}</a>
                <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
        </nav>
      </div>
    </div>

    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">${MenuItem.ADD_NEW_POINT}</button>
  </div>`
);


export default class MenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.innerText);
  }

}
