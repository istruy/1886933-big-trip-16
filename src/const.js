export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
];
export const OFFERS = [
  'Add luggage', 'Switch to comfort class', 'Add meal', 'Add alcohol', 'Choose neighbor', 'Change neighbor', 'Add book', 'Add music', 'Add pled', 'Change pled', 'Change alcohol'
];

export const PointDestination = {
  Amsterdam: 'Amsterdam',
  Tokyo: 'Tokyo',
  LosAngeles: 'Los-Angeles',
  Capetown: 'Capetown',
  NewYork: 'New-York'
};

export const PointTypes = {
  Taxi: 'taxi',
  Bus: 'bus',
  Train: 'train',
  Flight: 'flight',
  CheckIn: 'check-in',
  Sightseeing: 'sightseeing',
  Ship: 'ship',
  Drive: 'drive',
  Restaurant: 'restaurant'
};

export const PointTypesNames = {
  [PointTypes.Taxi]: 'Taxi',
  [PointTypes.Bus]: 'Bus',
  [PointTypes.Train]: 'Train',
  [PointTypes.Flight]: 'Flight',
  [PointTypes.CheckIn]: 'Check-in',
  [PointTypes.Sightseeing]: 'Sightseeing',
  [PointTypes.Ship]: 'Ship',
  [PointTypes.Drive]: 'Drive',
  [PointTypes.Restaurant]: 'Restaurant'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};

export const POINTS_COUNT = 15;

export const SORT_TYPES = {
  DAY: 'Day',
  PRICE: 'Price',
  TIME: 'Time',
  OFFERS: 'Offers',
  EVENT: 'Event'
};

export const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};
