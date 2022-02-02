import { MenuItem } from '../const.js';
import AbstractView from './abstract-view.js';

const createSiteMenuTemplate = () => (
  `<div class="trip-main">
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__navigation">
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-item=${MenuItem.POINTS} href="#">Table</a>
                <a class="trip-tabs__btn" data-menu-item=${MenuItem.STATS} href="#">Stats</a>
        </nav>
      </div>
    </div>

    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
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

  setActiveTab = (menuItem) => {
    const item = this.element.querySelector(`a[data-menu-item=${menuItem}]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }

    switch (menuItem) {
      case MenuItem.POINTS:
        const itemOther = this.element.querySelector(`a[data-menu-item=${MenuItem.STATS}]`);
        itemOther.classList.remove('trip-tabs__btn--active');
        break;
      case MenuItem.STATS:
        const itemOtherItem = this.element.querySelector(`a[data-menu-item=${MenuItem.POINTS}]`);
        itemOtherItem.classList.remove('trip-tabs__btn--active');
        break;
    }
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

}
