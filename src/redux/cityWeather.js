import fetch from 'isomorphic-fetch';

const WEATHER_REQUESTED = 'WEATHER_REQUESTED';
const WEATHER_SUCCESS = 'WEATHER_SUCCESS';
const WEATHER_FAILURE = 'WEATHER_FAILURE';
const MULTIPLE_CITIES_REQUESTED = 'MULTIPLE_CITIES_REQUESTED';

const defaultState = {
  cities: [],
  fetching: false,
};

// Reducer
export default function cityWeather(state = defaultState, action) {
  switch (action.type) {
    case WEATHER_REQUESTED:
      return Object.assign({}, state, { fetching: true });

    case WEATHER_SUCCESS:
      const newState = Object.assign({}, state, { fetching: false });
      newState.cities.push(action.cities);
      return newState;

    case WEATHER_FAILURE:
      return Object.assign({}, state, { error: action.error, fetching: false });

    case MULTIPLE_CITIES_REQUESTED:
      return Object.assign({}, state, { cities: [] });

    default:
      break;
  }

  return state;
}

// Action creator
function multipleCitiesRequested() {
  return { type: MULTIPLE_CITIES_REQUESTED };
}
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
    error,
    type: WEATHER_FAILURE,
  };
}

// Request multiple cities
export function requestMultipleCities(cities) {
  return (dispatch) => {
    dispatch(multipleCitiesRequested());

    cities.map((city) => (
      dispatch(requestCityWeather(city))
    ));
  };
}

// Request weather for city
function requestCityWeather(city) {
  return (dispatch) => {
    dispatch(weatherRequested());

    return fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=e72ef41a4cce709e8a85b48e02bf22b7')
      .then(response => response.json())
      .then(json => dispatch(weatherSuccess(json)))
      .catch(error => dispatch(weatherFailure(error)));
  };
}
