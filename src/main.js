import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { render, RenderPosition} from './utils/render.js';
import { getPoints } from './mock/mock.js';

const points = getPoints();

const siteMainElement = document.querySelector('.page-main .page-body__container');
const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');

render(siteMenuElement, RenderPosition.BEFOREEND, new SiteMenuView());
render(siteFilterElement, RenderPosition.BEFOREEND, new FilterView());

const tripEventsPresenter = new TripEventsPresenter(siteMainElement);
tripEventsPresenter.init(points);

const detailsTripElement = document.querySelector('.trip-main');
render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(points));
