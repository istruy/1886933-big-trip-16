import dayjs from 'dayjs';

// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElementFromArray = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

export const getRandomElementsFromArray = (elements) => {
  // Shuffle array
  const shuffled = elements.sort(() => 0.5 - Math.random());
  const randomLength = getRandomInteger(0, elements.length - 1);
  return shuffled.slice(0, randomLength);
};

export const getRandomBoolean = () => Math.random() < 0.5;

export const deleteItem = (items, deletedItem) => {
  const index = items.findIndex((item) => item.id === deletedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
};

export const getItemById = (items, id) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return -1;
  }

  return items[index];
};

export const getItemByName = (items, name) => {
  const index = items.findIndex((item) => item.name.toUpperCase() === name.toUpperCase());
  if (index === -1) {
    return -1;
  }

  return items[index];
};

// Используем особенности Set, чтобы удалить дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];

export const sumPointByPrice = (points, type) => {
  let sum = null;
  points.filter((point) => {
    if (point.type === type) {
      sum += point.basePrice;
    }
  });
  return sum;
};

export const getInfoAboutType = (points) => {
  const typePoints = new Map();
  const resultPoints = new Array();

  for (const el of points) {
    const typePoint = points.filter((point) => point.type === el.type);
    const pointPrice = typePoint.slice().reduce((sum, element) => sum + element.basePrice, 0);
    const pointCount = typePoint.length;
    const pointTime = typePoint.slice().reduce((sum, point) => sum + dayjs(point.dateTo).diff(point.dateFrom), 0);

    if (!typePoints.has(el.type)) {
      typePoints.set(el.type);
      resultPoints.push([el.type, pointPrice, pointCount, pointTime]);
    }
  }
  return resultPoints;
};
