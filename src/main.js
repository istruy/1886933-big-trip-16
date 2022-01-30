import SiteMenuView from './view/site-menu-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { render, RenderPosition } from './utils/render.js';
import { getDestinations, getOffers, getPoints } from './mock/mock.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const offers = getOffers();
const points = getPoints();
const destinations = getDestinations();

const pointModel = new PointModel();
pointModel.points = points;

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.page-main .page-body__container');
const siteMenuElement = document.querySelector('.trip-controls__navigation');

render(siteMenuElement, RenderPosition.BEFOREEND, new SiteMenuView());

const tripEventsPresenter = new TripEventsPresenter(siteMainElement, offers, destinations, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, pointModel, filterModel);

filterPresenter.init();
tripEventsPresenter.init();

const detailsTripElement = document.querySelector('.trip-main');
render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(points));
