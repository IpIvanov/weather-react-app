import { combineReducers } from 'redux'

const INIT_STATE = {
    coords: {
        latitude: 0,
        longitude: 0
    }
}

const LocationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_LOCATION_FULFILLED':
            return action.payload;
        default:
            return state
    }
}

const WeatherReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            return action.payload;
        default:
            return state
    }
}

const InvalidTown = (state = false, action) => {
    switch (action.type) {
        case 'INVALID_TOWN':
            return action.payload;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    location: LocationReducer,
    weather: WeatherReducer,
    isValidTown: InvalidTown,
})

export default rootReducer