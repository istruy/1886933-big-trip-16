import AbstractView from './abstract-view.js';

const createNoPointTemplate = () => (
  `<p class="board__no-points">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
