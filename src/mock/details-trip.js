import { getRandomInteger } from '../utils.js';

const getPointsDestination = () => {
  const pointsDestination = [
    'Amsterdam', 'Tokyo', 'Los-Angeles', 'Capetown', 'New-York'
  ];
  const randomIndex = getRandomInteger(0, pointsDestination.length - 1);
  return pointsDestination[randomIndex];
};

let arrayPoints = new Array();
arrayPoints = [getPointsDestination(), getPointsDestination()];

// const generateDate = () => {
//   const dateNow = dayjs();
//   const dateOffset = dateNow.add(getRandomInteger(2, 20), 'day');
//   return dateOffset;
// };

export const getDetailsTrip = () => (arrayPoints);
