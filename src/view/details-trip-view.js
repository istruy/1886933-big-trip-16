import { getRandomInteger } from '../utils.js';
import { POINTS_DESTINATION } from '../const.js';

export const createDetailsTripTemplate = () => {

  const getPoints = () => {
    const point = (
      `<h1 class="trip-info__title">${POINTS_DESTINATION[getRandomInteger(0, POINTS_DESTINATION.length - 1)]} ... ${POINTS_DESTINATION[0, POINTS_DESTINATION.length - 1]}</h1>`
    );
    return point;
  };

  return `<section class="trip-main__trip-info  trip-info">
          <div class="trip-info__main">
            <h1 class="trip-info__title">${getPoints()}</h1>

            <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
          </div>

          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomInteger(200, 3000)}</span>
          </p>
          </section>`;

};
