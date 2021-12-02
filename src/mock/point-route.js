import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';

const generateTypeRoute = () => {
  const typeRoute = [
    'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'
  ];

  return typeRoute[getRandomInteger(0, 8)];
};

const generatePointDestination = () => {
  const pointDestination = [
    'Amsterdam', 'Tokyo', 'Los-Angeles', 'Capetown', 'New-York'
  ];

  return pointDestination[getRandomInteger(0, 4)];
};

const generateOfferName = () => {
  const offers = [
    'Add luggage', 'Switch to comfort class', 'Add meal', 'Add alcohol', 'Choose neighbor'
  ];

  const randomIndex = getRandomInteger(0, 4);
  return offers[randomIndex];
};

const getOffer = () => {
  const generatePrice = () => {
    const randomPrice = getRandomInteger(10, 500);
    return randomPrice;
  };

  const randomOffer = {
    typeRoute: generateTypeRoute(),
    nameOffer: generateOfferName(),
    price: generatePrice(),

    getNameOffer() {
      return this.nameOffer;
    },
    getPrice() {
      return this.price;
    }
  };

  return randomOffer;
};

/**
 *
 * @returns Map() 0 - 5 results
 */
const generateOffer = () => {
  const arrayOffers = new Set();
  const randomIndex = getRandomInteger(0, 4);
  for (let i = 0; i < randomIndex; i++) {
    const randomOffer = getOffer();
    arrayOffers.add(randomOffer);
  }
  return arrayOffers;
};

const generateDate = () => {
  const dateNow = dayjs();
  const dateOffset = dateNow.add(getRandomInteger(2, 20), 'day');
  return dateOffset;
};

export const getPointRoute = () => {
  const randomPointRoute = {
    typeRoute: generateTypeRoute(),
    pointDestination: generatePointDestination(),
    offers: generateOffer(),
    //infoPointDestination: generateInfoDestination(),
    dateTime: generateDate()
  };
  return randomPointRoute;
};
