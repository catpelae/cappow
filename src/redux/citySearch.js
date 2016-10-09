const UPDATE = 'UPDATE';

// Reducer
export default function citySearch(state = {}, action) {
  if (action.type === UPDATE) {
    return Object.assign({}, state, { cityName: action.cityName });
  }

  return state;
}

// Action creator
export function updateCity(cityName) {
    return { type: UPDATE, cityName };
}

