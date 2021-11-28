import flatpickr from "flatpickr";

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
        'Amsterdam', 'Tokyo', 'Los-Angeles', 'Capetown', 'New-York'
    ];

    return pointDestination[randomIndex];
}

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

    let randomIndex = getRandomInteger(0, 5);
    let resultInfo;
    for (let i = 0; i < 4; i++) {
        resultInfo = description[randomIndex] + ' ';
    }
    
    return resultInfo;
}

const time = new DateTime();

const generatePointDestination = () => {
    const pointDestination = [
        {
            nameDestination: generatePointDestination(),
            information: generateDescription(),
            image: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000),
            image2: 'http://picsum.photos/248/152?r=' + getRandomInteger(1, 1000)
        }
    ];
    return pointDestination;
}

const generateOffer = () => {
    const offers = [
        'Add luggage', 'Switch to comfort class', 'Add meal', 'Add alcohol', 'Choose neighbor'
    ];

    let randomIndex = getRandomInteger(0, 4);
    return offers[randomIndex];
}

/**
 * 
 * @returns Map() 0 - 5 results
 */
const generateOffer = () => {
    const offer = () => {
        const randomOffer = {
            typeRoute: generateTypeRoute(),
            nameOffer: generateOffers(),
            price: {
                generatePrice = () => {
                    let randomPrice = getRandomInteger(10, 500);
                    return randomPrice;
                }
            },
            getNameOffer() {
                return this.nameOffer;
            },
            getPrice() {
                return this.price;
            }
        };

        let randomIndex = getRandomInteger(0, 4);
        let arrayOffers = new Map();
        for (let i = 0; i < randomIndex; i++) {
            arrayOffers.set(randomOffer[i].getNameOffer + ' +€ ' + randomOffer[i].getPrice);
        }
        return arrayOffers;
    }
};

export const pointRoute = () => {
    const randomPointRoute = {
        typeRoute: generateTypeRoute(),
        pointDestination: generatePointDestination(),
        offers: generateOffer(),
        infoPointDestination: generatePointDestination(),

    }
}