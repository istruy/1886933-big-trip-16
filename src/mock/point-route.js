// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTypeRoute = () => {
    const typeRoute = [
        'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'
    ];

    return typeRoute[randomIndex];
}

const generatePointDestination = () => {
    const pointDestination = [
        {
            nameDestination: 'Amsterdam',
            information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
            image: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        },
        {
            nameDestination: 'Tokyo',
            information: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
            image: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        },
        {
            nameDestination: 'Capetown',
            information: 'Aliquam id orci ut lectus varius viverra.',
            image: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        },
        {
            nameDestination: 'Los-Angeles',
            information: 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
            image1: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        },
        {
            nameDestination: 'New-York',
            information: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
            image: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        }
    ];

    let randomIndex = getRandomInteger(0, 4);
    return pointDestination[randomIndex];
}

const generateOffers = () => {
    const offers = [
        'Add luggage', 'Switch to comfort class', 'Add meal', 'Add alcohol', 'Choose neighbor'
    ];

    let randomIndex = getRandomInteger(0, 4);
    return offers[randomIndex];
}

const offers = {
    typeRoute: generateTypeRoute(),
    name: generateOffers(),
    price: {
        generatePrice = () => {
            let randomPrice = getRandomInteger(10, 500);
            return randomPrice;
        }
    }
};
