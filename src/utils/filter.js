import { FILTER_TYPE } from '../const.js';
import { isPointPast, isFuturePoint } from './point.js';

export const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateTo)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom)),
};
