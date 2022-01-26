import PointRouteView from '../view/point-route-view';
import FormEditingView from '../view/form-editing-view';
import FormCreationView from '../view/form-creation-view';
import { removeElement, render, RenderPosition, replace, add } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};

export default class PointPresenter {
  #point = null;
  #offers = [];
  #destinations = [];
  #changeData = null;
  #pointListContainer = null;
  #changeMode = null;
  #deleteData = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #pointCreateComponent = null;

  #mode = Mode.DEFAULT;

  constructor(offers, destinations, pointListContainer, changeData, changeMode, deleteData) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#deleteData = deleteData;
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
    this.#mode = Mode.CREATING;
  }

  #handleCreateClick = () => {
    this.#replaceNewPointToForm();
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    replace(this.#pointComponent, this.#pointCreateComponent);
    document.removeEventListener('keydown', this.#escDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #handleDeleteClick = () => {
    this.#deleteData(this.#point);
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
