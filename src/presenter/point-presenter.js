import PointRouteView from '../view/point-route-view';
import FormEditingView from '../view/form-editing-view';
import FormCreationView from '../view/form-creation-view';
import { removeElement, render, RenderPosition, replace, add } from '../utils/render.js';
import { Mode } from '../const';
import { isDatesEqual } from '../utils/point';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';


export default class PointPresenter {
  #point = null;
  #offers = [];
  #destinations = [];
  #changeData = null;
  #pointListContainer = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #pointCreateComponent = null;

  #mode = Mode.DEFAULT;

  constructor(offers, destinations, pointListContainer, changeData, changeMode) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointRoute = this.#pointComponent;
    const prevPointEditRoute = this.#pointEditComponent;
    const prevPointCreatePoint = this.#pointCreateComponent;

    this.#pointComponent = new PointRouteView(point);
    this.#pointEditComponent = new FormEditingView(this.#offers, this.#destinations, point);
    this.#pointCreateComponent = new FormCreationView(this.#offers, this.#destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointCreateComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointCreateComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setHideClickHandler(this.#handleHideClick);
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#handleCreateClick);

    if (prevPointRoute === null || prevPointEditRoute === null || prevPointCreatePoint === null) {
      render(this.#pointListContainer, RenderPosition.BEFOREEND, this.#pointComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointRoute);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditRoute);
    }

    if (this.#mode === Mode.CREATING) {
      replace(this.#pointEditComponent, prevPointRoute);
    }

    removeElement(prevPointRoute);
    removeElement(prevPointEditRoute);
    removeElement(prevPointCreatePoint);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  destroy = () => {
    removeElement(this.#pointComponent);
    removeElement(this.#pointEditComponent);
    removeElement(this.#pointCreateComponent);
  }

  #replaceNewPointToForm = () => {
    add(this.#pointCreateComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escDownHandler);
  }

  #handleCreateClick = () => {
    if (!(this.#mode === Mode.CREATING)) {
      this.#changeMode();
      this.#mode = Mode.CREATING;
      this.#replaceNewPointToForm();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, this.#pointEditComponent);
    } else if (this.#mode === Mode.CREATING) {
      replace(this.#pointComponent, this.#pointCreateComponent);
    }
    document.removeEventListener('keydown', this.#escDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleHideClick = () => {
    this.#replaceFormToPoint();
    document.querySelector('.event__rollup-btn').removeEventListener('click', this.#escDownHandler);
  }

  #handleFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = isDatesEqual(this.#point.dateFrom, update.dateFrom)
      || isDatesEqual(this.#point.dateTo, update.dateTo);

    if (this.#mode === Mode.EDITING) {
      this.#changeData(
        USER_ACTION.UPDATE_POINT,
        isMinorUpdate ? UPDATE_TYPE.PATCH : UPDATE_TYPE.MAJOR,
        update
      );
    } else if (this.#mode === Mode.CREATING) {
      this.#changeData(
        USER_ACTION.ADD_POINT,
        UPDATE_TYPE.MAJOR,
        update
      );
    }
    this.#replaceFormToPoint();
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #handleDeleteClick = () => {
    if (this.#mode === Mode.EDITING) {
      this.#changeData(
        USER_ACTION.DELETE_POINT,
        UPDATE_TYPE.MINOR,
        { ...this.#point },
      );
    }
    this.destroy();
  }

  #escDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      this.#pointEditComponent.reset(this.#point);
      this.#pointCreateComponent.reset(this.#point);
    }
  }
}
