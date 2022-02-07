import TripEventsPresenter from './presenter/trip-events-presenter.js';
import DetailsTripViewfrom from './view/details-trip-view.js';
import { removeElement, render, RenderPosition } from './utils/render.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { MenuItem } from './const.js';
import MenuView from './view/menu-view.js';
import StatsView from './view/stats-view.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic jdhfg65bfy46bf83hfbf85fbdjfu';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const pointModel = new PointModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.page-main .page-body__container');
const header = document.querySelector('.page-header__container');

const siteMenuComponent = new MenuView();

pointModel.init().finally(() => {
  const tripEventsPresenter = new TripEventsPresenter(siteMainElement, pointModel.offers, pointModel.destinations, pointModel, filterModel);
  const filterPresenter = new FilterPresenter(siteMainElement, pointModel, filterModel);

  let statisticsComponent = null;

  const handleSiteMenuClick = (menuItem) => {
    switch (menuItem) {
      case MenuItem.POINTS:
        filterPresenter.init();
        tripEventsPresenter.init();
        removeElement(statisticsComponent);
        siteMenuComponent.setActiveTab(menuItem);
        break;
      case MenuItem.STATS:
        filterPresenter.destroy();
        tripEventsPresenter.destroy();
        statisticsComponent = new StatsView(pointModel.points);
        render(siteMainElement, RenderPosition.BEFOREEND, statisticsComponent);
        siteMenuComponent.setActiveTab(menuItem);
        break;
    }
  };

  tripEventsPresenter.init();

  render(header, RenderPosition.BEFOREEND, siteMenuComponent);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  filterPresenter.init();
  const detailsTripElement = document.querySelector('.trip-main');
  render(detailsTripElement, RenderPosition.AFTERBEGIN, new DetailsTripViewfrom(pointModel.points));
});

