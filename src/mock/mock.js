import { getRandomBoolean, getRandomElementFromArray, getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
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
    description: getDescription()
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

export const getDestination = () => {
  const destination = {
    description: getDescription(),
    name: generatePointDestination(),
    pictures: generateImagesDestination()
  };
  return destination;
};

/** OFFERS */

const generatePrice = () => getRandomInteger(10, 30);

const generateOfferName = () => getRandomElementFromArray(OFFERS);

const getRandomOffer = () => {
  const offer = {
    id: getRandomInteger(1, 1000),
    title: generateOfferName(),
    price: generatePrice()
  };
  return offer;
};

const generateOffers = () => {
  const randomIndex = getRandomInteger(0, 5);
  const offers = new Array();
  for (let i = 0; i < randomIndex; i++) {
    offers.push(getRandomOffer());
  }
  return offers;
};

export const getOffersWithType = () => {
  const offers = generateOffers();
  const typesAndOffers = new Array();
  for (const element of TYPE_ROUTE) {
    typesAndOffers.push({ type: element, offers: offers });
  }
  return typesAndOffers;
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
    id: nanoid(),
    basePrice: getRandomInteger(100, 200),
    dateFrom: generateDate()[0],
    dateTo: generateDate()[1],
    destination: getDestination(),
    isFavorite: getRandomBoolean(),
    offers: getOffersWithType(),
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
