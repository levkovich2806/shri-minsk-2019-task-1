import { ON_SEARCH_NOTE } from '../constants/action-types';

const initialState = {
  searchText: "",
}

function rootReducer(state = initialState, action) {
  if (action.type === ON_SEARCH_NOTE) {
    return {
      ...state,
      searchText: action.payload.text,
    }
  }
  return state;
}

export default rootReducer;
