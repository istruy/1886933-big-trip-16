import { generateArrayFromElements, getRandomBoolean, getRandomElementFromArray } from '../utils.js';
import { getRandomInteger } from '../utils.js';
import dayjs from 'dayjs';
import { POINTS_DESTINATION, DESCRIPTION, OFFERS, POINTS_COUNT, TYPE_ROUTE } from '../const.js';

const generateTypeRoute = () => {
  return getRandomElementFromArray(TYPE_ROUTE);
};

const generatePointDestination = () => {
  return getRandomElementFromArray(POINTS_DESTINATION);
};

const getDestinations = () => {
  const destination = {
    description: getDescription(),
    name: generatePointDestination(),
    pictures: [generateImagesDestination()]
  };
  return destination;
};

const getDescription = () => {
  let randomDescription = '';
  for (let i = 0; i < DESCRIPTION.length; i++) {
    randomDescription += getRandomElementFromArray(DESCRIPTION);
  }
  return resultInfo;
};

const generateImagesDestination = () => {
  const pictures = {
    src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 200)}`,
    description: getDescription()
  }
  return generateArrayFromElements(pictures, 5);
};

/** OFFERS */

const getRandomOffer = () => {
  const offer = {
    id: getRandomInteger(1, 1000),
    title: generateOfferName(),
    price: generatePrice(),
    getNameOffer() {
      return this.title;
    },
    getPrice() {
      return this.price;
    }
  }
  return offer;
};

const generatePrice = () => {
  return getRandomInteger(10, 500);
};

const generateOfferName = () => {
  return getRandomElementFromArray(OFFERS);
}

const generateOffers = () => {
  return generateArrayFromElements(getRandomOffer(), 5);
};

/** DATE */

const generateDate = () => {
  const dateNow = dayjs();
  const dateOffset = dateNow.add(getRandomInteger(2, 20), 'day');
  return dateOffset;
};

const getPoint = () => {
  const point = {
    base_price: getRandomInteger(300, 500),
    date_from: generateDate(),
    date_to: generateDate(),
    destination: getDestinations(),
    id: getRandomInteger(300, 500),
    is_favorite: getRandomBoolean(),
    offers: generateOffers(),
    type: generateTypeRoute()
  }
  return point;
}

export const getPoints = () => {
  let points;
  for (let i = 0; i < POINTS_COUNT - 1; i++) {
    points.push(getPoint());
  }
  return points;
};



