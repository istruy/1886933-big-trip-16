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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const deleteItem = (items, deletedItem) => {
  const index = items.findIndex((item) => item.id === deletedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
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

