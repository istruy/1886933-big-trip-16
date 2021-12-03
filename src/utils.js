// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElementFromArray = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return pointsDestination[randomIndex];
};

export const generateArrayFromElements = (element, count) => {
  let elements = new Array();
  const randomIndex = getRandomInteger(0, count - 1);
  for (let i = 0; i < randomIndex; i++) {
    elements.push(element);
  }
  return elements;
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5
};
