import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import FormCreationView from './view/form-creation-view.js';
import FormEditingView from './view/form-editing-view.js';
import PointRouteView from './view/point-route-view.js';
import SortView from './view/sort-view.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { render, RenderPosition } from './render.js';
import { getPoints } from './mock/mock.js';
import TripEventsView from './view/all-points-view.js';

const points = getPoints();

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

render(siteMenuElement, RenderPosition.BEFOREEND, new SiteMenuView().element);
render(siteFilterElement, RenderPosition.BEFOREEND, new FilterView().element);

const sectionEventsElement = document.querySelector('.trip-events');

//render(sectionEventsElement, RenderPosition.BEFOREEND, new SortView().element);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointRouteView(point);
  const pointEditComponent = new FormEditingView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.card__btn--edit').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, RenderPosition.BEFOREEND, pointComponent.element);
};

const pointListComponent = new TripEventsView();
render(sectionEventsElement, RenderPosition.BEFOREEND, pointListComponent.element);
//const createTripEventsContainerElement = sectionEventsElement.querySelector('.trip-events__list');

for (let i = 0; i < points.length - 1; i++) {
  //renderPoint(pointListComponent.element, points[i]);
}

//render(createTripEventsContainerElement, RenderPosition.BEFOREEND, new FormCreationView(points[9]).element);

const detailsTripElement = document.querySelector('.trip-main');
render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(points).element);
