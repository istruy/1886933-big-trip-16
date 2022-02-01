import TripEventsPresenter from './presenter/trip-events-presenter.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { removeElement, render, RenderPosition } from './utils/render.js';
import { getDestinations, getOffers, getPoints } from './mock/mock.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { MenuItem } from './const.js';
import MenuView from './view/menu-view.js';
import StatsView from './view/stats-view.js';

const offers = getOffers();
const points = getPoints();
const destinations = getDestinations();

const pointModel = new PointModel();
pointModel.points = points;

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.page-main .page-body__container');
const header = document.querySelector('.page-header__container');
const siteMenuComponent = new MenuView();

render(header, RenderPosition.BEFOREEND, siteMenuComponent);

const tripEventsPresenter = new TripEventsPresenter(siteMainElement, offers, destinations, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, pointModel, filterModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      filterPresenter.init();
      tripEventsPresenter.init();
      removeElement(statisticsComponent);
      break;

    case MenuItem.STATS:
      filterPresenter.destroy();
      tripEventsPresenter.destroy();
      statisticsComponent = new StatsView(pointModel.points);
      render(siteMainElement, RenderPosition.BEFOREEND, statisticsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripEventsPresenter.init();

const detailsTripElement = document.querySelector('.trip-main');
render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(points));
