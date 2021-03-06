import PointRouteView from '../view/point-route-view';
import FormEditingView from '../view/form-editing-view';
import FormCreationView from '../view/form-creation-view';
import { removeElement, render, RenderPosition, replace, add } from '../utils/render.js';
import { Mode } from '../const';
import { isDatesEqual } from '../utils/point';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class PointPresenter {
  #point = null;
  #pointModel = null;
  #changeData = null;
  #pointListContainer = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #pointCreateComponent = null;

  #mode = Mode.DEFAULT;

  constructor(pointModel, pointListContainer, changeData, changeMode) {
    this.#pointModel = pointModel;
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
    this.#pointEditComponent = new FormEditingView(this.#pointModel.offers, this.#pointModel.destinations, point);
    this.#pointCreateComponent = new FormCreationView(this.#pointModel.offers, this.#pointModel.destinations);

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
      replace(this.#pointComponent, prevPointEditRoute);
      this.#mode = Mode.DEFAULT;
    }

    if (this.#mode === Mode.CREATING) {
      replace(this.#pointComponent, prevPointRoute);
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

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      if (this.#mode === Mode.EDITING) {
        this.#pointEditComponent.updateData({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      } else if (this.#mode === Mode.CREATING) {
        this.#pointCreateComponent.updateData({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      }
    };

    if (this.#mode === Mode.CREATING) {
      switch (state) {
        case State.SAVING:
          this.#pointCreateComponent.updateData({
            isDisabled: true,
            isSaving: true,
          });
          break;
        case State.DELETING:
          this.#pointCreateComponent.updateData({
            isDisabled: true,
            isDeleting: true,
          });
          break;
        case State.ABORTING:
          this.#pointComponent.shake(resetFormState);
          this.#pointCreateComponent.shake(resetFormState);
          break;
      }
    } else if (this.#mode === Mode.EDITING) {
      switch (state) {
        case State.SAVING:
          this.#pointEditComponent.updateData({
            isDisabled: true,
            isSaving: true,
          });
          break;
        case State.DELETING:
          this.#pointEditComponent.updateData({
            isDisabled: true,
            isDeleting: true,
          });
          break;
        case State.ABORTING:
          this.#pointComponent.shake(resetFormState);
          this.#pointEditComponent.shake(resetFormState);
          break;
      }
    }
  }

  #handleHideClick = () => {
    this.#replaceFormToPoint();
    document.querySelector('.event__rollup-btn').removeEventListener('click', this.#escDownHandler);
  }

  #handleFormSubmit = (update) => {
    // ??????????????????, ???????????????????? ???? ?? ???????????? ????????????, ?????????????? ???????????????? ?????? ????????????????????,
    // ?? ???????????? ?????????????? ?????????????????????? ???????????? - ???????? ?????????? ??????, ?????? PATCH-????????????????????
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
      this.#replaceFormToPoint();
    }
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

  setSaving = () => {
    this.#pointCreateComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      if (this.#mode === Mode.EDITING) {
        this.#pointEditComponent.updateData({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
        this.#pointEditComponent.shake(resetFormState);
      } else if (this.#mode === Mode.CREATING) {
        this.#pointCreateComponent.updateData({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
        this.#pointCreateComponent.shake(resetFormState);
      }
    };
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
