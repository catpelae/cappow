import fetch from 'isomorphic-fetch';

const WEATHER_REQUESTED = 'WEATHER_REQUESTED';
const WEATHER_SUCCESS = 'WEATHER_SUCCESS';
const WEATHER_FAILURE = 'WEATHER_FAILURE';

const defaultState = {
    // TODO: This is a bit redunant naming as the state from this reducer will be put into state.cityWeather. At some point you'll need to treat this as an array with citites, so I'd change it to simply 'cities'
    cities: [],
    fetching: false,
};

// Reducer
export default function cityWeather(state = defaultState, action) {
    switch (action.type) {
        case WEATHER_REQUESTED:
                                // TODO defaultState is assigned to state in the function, so it should not be necessary to explicitly use it here
            return Object.assign({}, defaultState, { fetching: true });
            
        case WEATHER_SUCCESS:
            // TODO This is also were you'll need to stuff into cityWeather with city: data
            let newstate = Object.assign({}, state, { fetching: false });
            newstate.cities.push(action.cities)
            return newstate

        case WEATHER_FAILURE:
            return Object.assign({}, state, { error: action.error, fetching: false });
           
        default:
            break;
    }
    return state;
}

// Action creator
function weatherRequested() {
    return { type: WEATHER_REQUESTED };
}

function weatherSuccess(cities) {
    return {
        cities,
        type: WEATHER_SUCCESS,
    };
}

function weatherFailure(error) {
    return {
        error: error,
        type: WEATHER_FAILURE,
    };
}

// Request multiple cities
export function requestMultipleCities(cities) {
    return (dispatch) => {
        cities.map((city) => (
            dispatch(requestCityWeather(city))
        ))};
}


// Request weather for city
function requestCityWeather(city) {
    return (dispatch) => {
        dispatch(weatherRequested());

        return fetch('http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&APPID=e72ef41a4cce709e8a85b48e02bf22b7')
            .then(response => response.json())
            .then(json => dispatch(weatherSuccess(json)))
            .catch(error => dispatch(weatherFailure(error)));
    }
}

