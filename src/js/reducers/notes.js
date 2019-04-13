import {
  FETCH_ON_GET_NOTES_SUCCESS,
  FETCH_ON_GET_NOTES_START,
  FETCH_ON_GET_NOTES_STOP,
  FETCH_ON_GET_NOTES_DATA_SUCCESS,
  FETCH_ON_GET_NOTES_DATA_START,
  FETCH_ON_GET_NOTES_DATA_STOP
} from "../constants/action-types";

const initialState = {
  notes: [],
  tags: [],
  colors: [],
  colorsHash: {}, //Хэш цветов для быстрого доступа, не прибегая к постоянному перебору массива при выборе цвета по ID
  tagsHash: {}, //Хэш тэгов для быстрого доступа, не прибегая к постоянному перебору массива при выборе тэга по ID
  isLoading: false,
  isLoadingMainData: false,
};
function rootReducer(state = initialState, action) {
  if (action.type === FETCH_ON_GET_NOTES_START) {
    return {
      ...state, isLoading: true,
    };
  } else if (action.type === FETCH_ON_GET_NOTES_SUCCESS) {
    return {
      ...state,
      notes: action.payload
    };
  } else if (action.type === FETCH_ON_GET_NOTES_STOP) {
    return {
      ...state, isLoading: false,
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_START) {
    return {
      ...state, isLoadingMainData: true,
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_SUCCESS) {
    const { colors, tags } = action.payload;

    let colorsHash = {};
    colors.forEach(color => colorsHash[color.id] = color);

    let tagsHash = {};
    tags.forEach(tag => tagsHash[tag.id] = tag);

    const data = { ...action.payload, colorsHash, tagsHash };
    return {
      ...state,
      ...data
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_STOP) {
    return {
      ...state, isLoadingMainData: false,
    };
  }
  return state;
}
export default rootReducer;
