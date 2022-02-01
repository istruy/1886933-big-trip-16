import dayjs from 'dayjs';
import { getItemById } from './common.js';

export const getYearMonthDayFormat = (date) => dayjs(date).format('YYYY-MM-DD');
export const getYearMonthDayHourMinuteFormat = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');
export const getMonthDayFormat = (date) => dayjs(date).format('MMM D');
export const getHourMinute = (date) => dayjs(date).format('HH:mm');
export const getYearMonthDaySlashFormat = (date) => dayjs(date).format('YY/MM/DD HH:mm');

export const sortPriceForChart = (pointA, pointB) => {
  if (pointA[1] > pointB[1]) {
    return -1;
  } else if (pointA[1] < pointB[1]) {
    return 1;
  }
  return 0;
};

export const sortCountForChart = (pointA, pointB) => {
  if (pointA[2] > pointB[2]) {
    return -1;
  } else if (pointA[2] < pointB[2]) {
    return 1;
  }
  return 0;
};

export const sortTimeForChart = (pointA, pointB) => {
  if (pointA[3] > pointB[3]) {
    return -1;
  } else if (pointA[3] < pointB[3]) {
    return 1;
  }
  return 0;
};

export const sortPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) {
    return 1;
  } else if (pointA.basePrice < pointB.basePrice) {
    return -1;
  }
  return 0;
};

export const sortTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(pointB.dateTo);

export const sortDay = (pointA, pointB) => {
  if (dayjs(pointA.dateFrom).format('YYYY-MM-DD') > dayjs(pointB.dateFrom).format('YYYY-MM-DD')) {
    return 1;
  } else if (dayjs(pointA.dateFrom).format('YYYY-MM-DD') < dayjs(pointB.dateFrom).format('YYYY-MM-DD')) {
    return -1;
  }
  return 0;
};

export const isPointPast = (date) => !date && dayjs().isBefore(date);

export const isFuturePoint = (date) => date && (dayjs(date).isAfter(dayjs()) || dayjs(date).format('YY/MM/DD HH') === dayjs().isAfter(date, 'YY/MM/DD HH'));


export const getItemByType = (typeItem, allItems) => {
  const itemIndex = allItems.findIndex((item) => item.type === typeItem);
  return allItems[itemIndex];
};

export const getItemByIdAndType = (allItems, type, id) => {
  const el = getItemByType(type, allItems);
  const item = getItemById(el.offers, Number(id));
  return item;
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

