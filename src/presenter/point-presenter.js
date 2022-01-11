import PointRouteView from '../view/point-route-view';
import FormEditingView from '../view/form-editing-view';
import { removeElement, render, RenderPosition, replace } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #point = null;
  #changeData = null;
  #pointListContainer = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointRoute = this.#pointComponent;
    const prevPointEditRoute = this.#pointEditComponent;

    this.#pointComponent = new PointRouteView(point);
    this.#pointEditComponent = new FormEditingView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointRoute === null || prevPointEditRoute === null) {
      render(this.#pointListContainer, RenderPosition.BEFOREEND, this.#pointComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointRoute);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditRoute);
    }

    removeElement(prevPointRoute);
    removeElement(prevPointEditRoute);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy = () => {
    removeElement(this.#pointComponent);
    removeElement(this.#pointEditComponent);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
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

  #escDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

}
