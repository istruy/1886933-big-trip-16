import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createFormCreationTemplate } from './view/form-creation-view.js';
import { createFormEditingTemplate } from './view/form-editing-view.js';
import { createPointRouteTemplate } from './view/point-route-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createDetailsTripTemplate } from './view/details-trip-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { getPoints } from './mock/point-route.js';
import { POINTS_COUNT } from './const.js';

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

renderTemplate(siteMenuElement, RenderPosition.BEFOREEND, createSiteMenuTemplate());
renderTemplate(siteFilterElement, RenderPosition.BEFOREEND, createFilterTemplate());

const sectionEventsElement = document.querySelector('.trip-events');

let pointRoute;
pointRoute = getPoints();
renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createSortTemplate());
//renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormEditingTemplate(pointRoute, getInfoAboutDestination()));

for (let i = 0; i < POINTS_COUNT - 1; i++) {
  pointRoute = getPointRoute();
  renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createPointRouteTemplate(pointRoute));
}

//renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormCreationTemplate(pointRoute, getInfoAboutDestination()));

const detailsTripElement = document.querySelector('.trip-main');
//renderTemplate(detailsTripElement, RenderPosition.AFTERBEGIN, createDetailsTripTemplate(getDetailsTrip()));

