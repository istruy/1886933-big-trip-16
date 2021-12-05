export const createDetailsTripTemplate = (points) => {

  const getPointFrom = () => {
    const { destination } = points[0];
    const { name } = destination;
    return name;
  };

  const getPointTo = () => {
    const { destination } = points[points.length - 1];
    const { name } = destination;
    return name;
  };

  const getFullPrice = () => {
    let fullPrice = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const { basePrice, offers } = points[i];
      fullPrice += basePrice;
      for (const element of offers) {
        fullPrice += element.getPrice();
      }
    }
    return fullPrice;
  }

  const getPoints = () => {
    const point = (
      `<h1 class="trip-info__title">${getPointFrom()} ... ${getPointTo()}</h1>`
    );
    return point;
  };

  return `<section class="trip-main__trip-info  trip-info">
          <div class="trip-info__main">
            <h1 class="trip-info__title">${getPoints()}</h1>

            <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
          </div>

          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice()}</span>
          </p>
          </section>`;

};
