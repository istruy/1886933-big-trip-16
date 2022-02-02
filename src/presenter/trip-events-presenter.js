import { SORT_TYPES } from '../const';
import { sortPrice, sortTime, sortDay } from '../utils/point';
import { render, RenderPosition } from '../utils/render';
import { removeElement } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import TripEventsView from '../view/all-points-view';
import BoardView from '../view/board-view';
import NoPointView from '../view/no-point-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';

export default class TripEventsPresenter {
  #tripEvents = null;
  #offers = [];
  #destinations = [];
  #pointModel = null;
  #filterModel = null;

  #boardComponent = new BoardView();
  #tripEventsComponent = new TripEventsView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #pointPresenter = new Map();
  #currentSortType = SORT_TYPES.DAY;

  constructor(boardContainer, offers, destinations, pointModel, filterModel) {
    this.#tripEvents = boardContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPES.PRICE:
        return filteredPoints.sort(sortPrice);
      case SORT_TYPES.TIME:
        return filteredPoints.sort(sortTime);
      case undefined:
        break;
      case SORT_TYPES.DAY:
        return filteredPoints.sort(sortDay);
    }

    return filteredPoints;
  }

  init = () => {
    render(this.#tripEvents, RenderPosition.BEFOREEND, this.#boardComponent);
    render(this.#boardComponent, RenderPosition.BEFOREEND, this.#tripEventsComponent);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  }

  destroy = () => {
    this.#clearBoard();

    removeElement(this.#boardComponent);

    this.#pointModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#offers, this.#destinations, this.#tripEventsComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    if (sortType !== undefined) {
      this.#currentSortType = sortType;
      this.#clearBoard();
      this.#renderBoard();
    }
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortClickHandler(this.#handleSortTypeChange);
    render(this.#boardComponent, RenderPosition.AFTERBEGIN, this.#sortComponent);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
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

  #clearBoard = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    removeElement(this.#sortComponent);
    removeElement(this.#noPointComponent);
  }

  #renderBoard = () => {
    const pointCount = this.points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    const pointListComponent = this.#tripEventsComponent;
    render(this.#boardComponent, RenderPosition.BEFOREEND, pointListComponent);
    this.#renderPoints(this.points);
  }
}
