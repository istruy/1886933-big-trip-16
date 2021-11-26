import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createFormCreationTemplate } from './view/form-creation-view.js';
import { createFormEditingTemplate } from './view/form-editing-view.js';
import { createPointRouteTemplate } from './view/point-route-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const EVENTS_COUNT = 3;

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

renderTemplate(siteMenuElement, RenderPosition.BEFOREEND, createSiteMenuTemplate());
renderTemplate(siteFilterElement, RenderPosition.BEFOREEND, createFilterTemplate());

const sectionEventsElement = document.querySelector('.trip-events');

renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createSortTemplate());
renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormEditingTemplate());

for (let i = 0; i < EVENTS_COUNT - 1; i++) {
  renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createPointRouteTemplate());
}

renderTemplate(sectionEventsElement, RenderPosition.BEFOREEND, createFormCreationTemplate());


