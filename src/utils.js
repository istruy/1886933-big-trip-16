import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
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

export const getRandomBoolean = () => Math.random() < 0.5;

export const getYearMonthDayFormat = (date) => dayjs(date).format('YYYY-MM-DD');
export const getYearMonthDayHourMinuteFormat = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');
export const getMonthDayFormat = (date) => dayjs(date).format('MMM D');
export const getHourMinute = (date) => dayjs(date).format('HH:mm');
export const getYearMonthDaySlashFormat = (date) => dayjs(date).format('YY/MM/DD HH:mm');
