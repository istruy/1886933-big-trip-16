import { updateItem } from '../utils/common';
import { render, RenderPosition } from '../utils/render';
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

  constructor(boardContainer) {
    this.#tripEvents = boardContainer;
  }

  init = (tripEvents) => {
    this.#boardPoints = [...tripEvents];

    render(this.#tripEvents, RenderPosition.BEFOREEND, this.#boardComponent);
    render(this.#boardComponent, RenderPosition.BEFOREEND, this.#tripEventsComponent);

    this.#renderBoard();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventsComponent, this.#handlePointChange, this.#handleModeChange);
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

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

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
      render(this.#boardComponent, RenderPosition.BEFOREEND, this.#sortComponent);
      const pointListComponent = this.#tripEventsComponent;
      render(this.#boardComponent, RenderPosition.BEFOREEND, pointListComponent);
      this.#renderPointsList(this.#boardPoints);
    }
  }
}
