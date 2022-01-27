import AbstractView from './abstract-view';

export default class SmartView extends AbstractView {
  _data = {};

  constructor() {
    super();
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only implementing');
    }
  }

  updateElement = () => {
    const prevElement = this.element;
    const parentElement = prevElement.parentElement;
    this.removeElement();
    const newElement = this.element;
    if (parentElement !== null) {
      parentElement.replaceChild(newElement, prevElement);
    }
    this.restoreHandlers();
  }

  updateData = (update) => {
    if (!update) {
      return;
    }
    this._data = { ...this._data, ...update };
    this.updateElement();
  }
}
