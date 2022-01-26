import dayjs from 'dayjs';
import { getItemById } from './common.js';

export const getYearMonthDayFormat = (date) => dayjs(date).format('YYYY-MM-DD');
export const getYearMonthDayHourMinuteFormat = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');
export const getMonthDayFormat = (date) => dayjs(date).format('MMM D');
export const getHourMinute = (date) => dayjs(date).format('HH:mm');
export const getYearMonthDaySlashFormat = (date) => dayjs(date).format('YY/MM/DD HH:mm');

export const sortPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) {
    return 1;
  } else if (pointA.basePrice < pointB.basePrice) {
    return -1;
  }
  return 0;
};

export const sortTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(pointB.dateTo);

export const getItemByType = (typeItem, allItems) => {
  const itemIndex = allItems.findIndex((item) => item.type === typeItem);
  return allItems[itemIndex];
};

export const getItemByIdAndType = (allItems, type, id) => {
  const el = getItemByType(type, allItems);
  const item = getItemById(el.offers, Number(id));
  return item;
};
