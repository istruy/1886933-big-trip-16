import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import FormEditingView from './view/form-editing-view.js';
import PointRouteView from './view/point-route-view.js';
import SortView from './view/sort-view.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { render, RenderPosition, replace, removeElement } from './utils/render.js';
import { getPoints } from './mock/mock.js';
import TripEventsView from './view/all-points-view.js';
import NoPointView from './view/no-point-view.js';

const points = getPoints();

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

render(siteMenuElement, RenderPosition.BEFOREEND, new SiteMenuView());
render(siteFilterElement, RenderPosition.BEFOREEND, new FilterView());

const sectionEventsElement = document.querySelector('.trip-events');


const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointRouteView(point);
  const pointEditComponent = new FormEditingView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, RenderPosition.BEFOREEND, pointComponent);
};

if (points.length === 0) {
  render(sectionEventsElement, RenderPosition.BEFOREEND, new NoPointView());

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

} else {
  render(sectionEventsElement, RenderPosition.BEFOREEND, new SortView());
  const pointListComponent = new TripEventsView();
  render(sectionEventsElement, RenderPosition.BEFOREEND, pointListComponent);
  for (let i = 0; i < points.length - 1; i++) {
    renderPoint(pointListComponent, points[i]);
  }
}

const detailsTripElement = document.querySelector('.trip-main');
render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(points));
