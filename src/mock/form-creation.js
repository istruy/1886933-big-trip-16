import { getRandomInteger } from '../utils.js';

const getPointsDestination = () => {
  const pointsDestination = [
    'Amsterdam', 'Tokyo', 'Los-Angeles', 'Capetown', 'New-York'
  ];
  return pointsDestination;
};

/**
 *
 * @returns Map() 0-5 results
 */
const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
  ];

  const randomIndex = getRandomInteger(0, 5);
  let resultInfo;
  for (let i = 0; i < 4; i++) {
    resultInfo = description[randomIndex];
  }

  return resultInfo;
};

const generateInfoDestination = () => {
  const urlImage1 = getRandomInteger(1, 1000);
  const urlImage2 = getRandomInteger(1, 1000);
  const pointDestination = [
    generateDescription(),
    `http://picsum.photos/248/152?r=${urlImage1}`,
    `http://picsum.photos/248/152?r=${urlImage2}`
  ];
  return pointDestination;
};

export const getInfoAboutDestination = () => {
  const randomInfo = {
    info: generateInfoDestination(),
    points: getPointsDestination()
  };
  return randomInfo;
};
