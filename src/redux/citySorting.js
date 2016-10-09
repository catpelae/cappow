const SORT_SELECTED = 'SORT_SELECTED';

const defaultState = {
  sorting: 'name',
};

// Reducer
export default function citySort(state = defaultState, action) {
  if (action.type === SORT_SELECTED) {
    return Object.assign({}, state, { sorting: action.sorting });
  }

  return state;
}

// Action creator
export function updateSort(sorting) {
  return { type: SORT_SELECTED, sorting };
}
