const UPDATE = 'UPDATE';

const defaultState = {
    cityName: "",
}
// Reducer
export default function citySearch(state = defaultState, action) {
  if (action.type === UPDATE) {
    return Object.assign({}, state, { cityName: action.cityName });
  }

  return state;
}

// Action creator
export function updateCity(cityName) {
    return { type: UPDATE, cityName };
}

