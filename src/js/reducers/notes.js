import {
  FETCH_ON_GET_NOTES_SUCCESS,
  FETCH_ON_GET_NOTES_START,
  FETCH_ON_GET_NOTES_STOP,
} from "../constants/action-types";

const initialState = {
  list: [],
  isLoading: false,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ON_GET_NOTES_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case FETCH_ON_GET_NOTES_START:
      return {
        ...state, isLoading: true,
      };
    case FETCH_ON_GET_NOTES_STOP:
      return {
        ...state, isLoading: false,
      };
  };
  return state;
}
export default rootReducer;
