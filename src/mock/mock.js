import { getRandomBoolean, getRandomElementFromArray } from '../utils.js';
import { getRandomInteger } from '../utils.js';
import dayjs from 'dayjs';
import { POINTS_DESTINATION, DESCRIPTION, OFFERS, POINTS_COUNT, TYPE_ROUTE } from '../const.js';

const generateTypeRoute = () => getRandomElementFromArray(TYPE_ROUTE);

const generatePointDestination = () => getRandomElementFromArray(POINTS_DESTINATION);

const getDescription = () => {
  let randomDescription = '';
  for (let i = 0; i < DESCRIPTION.length; i++) {
    randomDescription += getRandomElementFromArray(DESCRIPTION);
  }
  return randomDescription;
};

const getPicture = () => {
  const pictures = {
    src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 200)}`,
    description: getDescription(),
    getSrc() {
      return this.src;
    }
  };
  return pictures;
};

const generateImagesDestination = () => {
  const pictures = new Array();
  const randomIndex = getRandomInteger(1, 4);
  for (let i = 0; i < randomIndex; i++) {
    pictures.push(getPicture());
  }
  return pictures;
};

const getDestinations = () => {
  const destination = {
    description: getDescription(),
    name: generatePointDestination(),
    pictures: generateImagesDestination()
  };
  return destination;
};

/** OFFERS */

const generatePrice = () => getRandomInteger(10, 500);

const generateOfferName = () => getRandomElementFromArray(OFFERS);

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
  };
  return offer;
};

const generateOffers = () => {
  const offers = new Array();
  const randomIndex = getRandomInteger(0, 5);
  for (let i = 0; i < randomIndex; i++) {
    offers.push(getRandomOffer());
  }
  return offers;
};

/** DATE */

const generateDate = () => {
  const dateNow = dayjs();
  const dateOffset = dateNow.add(getRandomInteger(2, 20), 'day');
  const dateToFrom = new Array();
  dateToFrom.push(dateOffset);
  dateToFrom.push(dateOffset.add(30, 'minute'));
  return dateToFrom;
};

const getPoint = () => {
  const point = {
    basePrice: getRandomInteger(300, 500),
    dateFrom: generateDate()[0],
    dateTo: generateDate()[1],
    destination: getDestinations(),
    id: getRandomInteger(300, 500),
    isFavorite: getRandomBoolean(),
    offers: generateOffers(),
    type: generateTypeRoute()
  };
  return point;
};

export const getPoints = () => {
  const points = new Array();
  for (let i = 0; i < POINTS_COUNT - 1; i++) {
    points.push(getPoint());
  }
  return points;
};
