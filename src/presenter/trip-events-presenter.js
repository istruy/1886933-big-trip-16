import { SORT_TYPES } from '../const';
import { updateItem, deleteItem } from '../utils/common';
import { sortPrice, sortTime } from '../utils/point';
import { render, RenderPosition } from '../utils/render';
import { removeElement } from '../utils/render.js';
import TripEventsView from '../view/all-points-view';
import BoardView from '../view/board-view';
import NoPointView from '../view/no-point-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';

export default class TripEventsPresenter {
  #tripEvents = null;

  #boardComponent = new BoardView();
  #tripEventsComponent = new TripEventsView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPES.DAY;
  #sourceSortPoints = null;

  constructor(boardContainer) {
    this.#tripEvents = boardContainer;
  }

  init = (tripEvents) => {
    this.#boardPoints = [...tripEvents];

    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourceSortPoints = [...this.#boardPoints];

    render(this.#tripEvents, RenderPosition.BEFOREEND, this.#boardComponent);
    render(this.#boardComponent, RenderPosition.BEFOREEND, this.#tripEventsComponent);

    this.#renderBoard();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventsComponent, this.#handlePointChange, this.#handleModeChange, this.#handlePointDelete);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointsList = (points) => {
    for (let i = 0; i < points.length - 1; i++) {
      this.#renderPoint(points[i]);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTypes(sortType);
    this.#clearPointList();
    this.#renderPointsList(this.#boardPoints);
    removeElement(this.#sortComponent);
    this.#sortComponent = new SortView(sortType);
    this.#renderSort();
  }

  #renderSort = () => {
    render(this.#boardComponent, RenderPosition.AFTERBEGIN, this.#sortComponent);
    this.#sortComponent.setSortClickHandler(this.#handleSortTypeChange);
  }

  #handlePointDelete = (deletedPoint) => {
    this.#boardPoints = deleteItem(this.#boardPoints, deletedPoint);
    this.#pointPresenter.delete(deletedPoint.id);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#currentSortType = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortTypes = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.PRICE:
        this.#boardPoints.sort(sortPrice);
        break;
      case SORT_TYPES.TIME:
        this.#boardPoints.sort(sortTime);
        break;
      default:
        this.#boardPoints = [...this.#sourceSortPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderNoPoints = () => {
    render(this.#boardComponent, RenderPosition.BEFOREEND, this.#noPointComponent);

    const siteFilterElement = document.querySelector('.trip-controls__filters');

    const filterEverythingContainer = siteFilterElement.querySelector('.trip-filters__filter:nth-child(1)');
    const filterFutureContainer = siteFilterElement.querySelector('.trip-filters__filter:nth-child(2)');
    const filterPastContainer = siteFilterElement.querySelector('.trip-filters__filter:nth-child(3)');

    filterEverythingContainer.addEventListener('click', () => {
      document.querySelector('.trip-events__msg').innerHTML = 'Click New Event to create your first point';
    });

    filterFutureContainer.addEventListener('click', () => {
      document.querySelector('.trip-events__msg').innerHTML = 'There are no future events now';
    });

    filterPastContainer.addEventListener('click', () => {
      document.querySelector('.trip-events__msg').innerHTML = 'There are no past events now';
    });
  }

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      const pointListComponent = this.#tripEventsComponent;
      render(this.#boardComponent, RenderPosition.BEFOREEND, pointListComponent);
      this.#renderPointsList(this.#boardPoints);
    }
  }
}
