import FilterView from '../view/filter-view.js';
import { render, RenderPosition, replace, removeElement } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { FILTER_TYPE, UPDATE_TYPE } from '../const.js';

export default class FilterPresenter {
  #filterModel = null;
  #pointsModel = null;
  #filterContainer = null;

  #filterComponent = null;

  constructor(filterContainer, pointsModel, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
  }

  get filters() {
    const points = this.#pointsModel.points;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FILTER_TYPE.EVERYTHING](points).length,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: 'FUTURE',
        count: filter[FILTER_TYPE.FUTURE](points).length,
      },
      {
        type: FILTER_TYPE.PAST,
        name: 'PAST',
        count: filter[FILTER_TYPE.PAST](points).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      const siteFilterElement = document.querySelector('.trip-main__trip-controls');
      render(siteFilterElement, RenderPosition.BEFOREEND, this.#filterComponent);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    removeElement(prevFilterComponent);
  }

  destroy = () => {
    removeElement(this.#filterComponent);
    this.#filterComponent = null;

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }
}
