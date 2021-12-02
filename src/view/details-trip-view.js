import { getRandomInteger } from '../utils.js';

export const createDetailsTripTemplate = (details) => {

  // const getRandomDate = () => {
  //   const datetime1 = dateTime1.format('MMM D');
  //   console.log(datetime1);
  //   dateTime2.format('D');
  //   if (datetime1.format('MM') == dateTime2.format('MM')) {
  //     dateTime2.format('MMM D');
  //   }
  //   return [datetime1, dateTime2];
  // }

  const getPoints = () => {
    const point = (
      `<h1 class="trip-info__title">${details[0]} ... ${details[1]}</h1>`
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
