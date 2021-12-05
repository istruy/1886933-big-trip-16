import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createFormCreationTemplate } from './view/form-creation-view.js';
import { createFormEditingTemplate } from './view/form-editing-view.js';
import { createPointRouteTemplate } from './view/point-route-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createDetailsTripTemplate } from './view/details-trip-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { getPoints } from './mock/mock.js';

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

renderTemplate(siteMenuElement, RenderPosition.BEFOREEND, createSiteMenuTemplate());
renderTemplate(siteFilterElement, RenderPosition.BEFOREEND, createFilterTemplate());

const sectionEventsElement = document.querySelector('.trip-events');

const pointsRoute = getPoints();
renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createSortTemplate());
renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormEditingTemplate(pointsRoute[0]));

for (let i = 0; i < pointsRoute.length - 1; i++) {
  renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createPointRouteTemplate(pointsRoute[i]));
}

renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormCreationTemplate(pointsRoute[9]));

const detailsTripElement = document.querySelector('.trip-main');
renderTemplate(detailsTripElement, RenderPosition.AFTERBEGIN, createDetailsTripTemplate(pointsRoute));

