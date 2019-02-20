export const GET_LOCATION = 'GET_LOCATION';
export const GET_WEATHER = 'GET_WEATHER';
export const INVALID_TOWN = 'INVALID_TOWN';
const APIToken = '7b3d684c466d333747b1d960e506931d';

export const getLocation = () => {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject(new Error('Permission denied'));
        });
    });

    return {
        type: GET_LOCATION,
        payload: location
    }
};

const getWeatherData = (json) => {
    return {
        type: GET_WEATHER,
        payload: json,
    }
};

const setInvalidTown = (payload) => {
    return {
        type: INVALID_TOWN,
        payload
    }
}

export const fetchWeatherByTown = (town = 'sofia') => dispatch => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&appid=${APIToken}`)
        .then(result => (result.json()))
        .then(json => {
            if (json.message === 'city not found' || json.message === 'Nothing to geocode') {
                return dispatch(setInvalidTown(true));
            }
            const weatherListForFiveDays = json.list.map((item, index) => {
                if (index % 8 === 0) {
                    return item;
                }

                return undefined;
            }).filter(function (el) {
                return el !== undefined;
            });
            dispatch(setInvalidTown(false));
            dispatch(getWeatherData(weatherListForFiveDays));
        });
}

export const fetchWeatherDataByCoords = () => dispatch => {
    dispatch(getLocation()).then((result) => {
        const { coords: { latitude, longitude } } = result.value;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIToken}`)
            .then(result => (result.json()))
            .then(json => {
                const weatherListForFiveDays = json.list.map((item, index) => {
                    if (index % 8 === 0) {
                        return item;
                    }

                    return undefined;
                }).filter(function (el) {
                    return el !== undefined;
                });
                dispatch(setInvalidTown(false));
                dispatch(getWeatherData(weatherListForFiveDays));
            });
    });
};
