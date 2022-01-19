import AbstractView from "./abstract-view";

export default class SmartView extends AbstractView {
  constructor() {
    super();
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only implementing');
    }
  }

  restoreHandlers() {

  }

  updateElement = () => {
    const prevElement = this.element;
    const parentElement = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parentElement.replaceChild(newElement, prevElement);
  }

  updateData = (update) => {
    if (!update) {
      return;
    }
    this._data = { ...this._data, ...update };
    this.updateElement();
  }
}
