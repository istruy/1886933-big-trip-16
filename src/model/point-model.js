import AbstractObservable from '../utils/abstract-observable.js';

export default class PointModel extends AbstractObservable {
  #points = [];

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }
}
