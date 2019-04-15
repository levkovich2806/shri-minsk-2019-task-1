import {
  FETCH_ON_GET_NOTES_SUCCESS,
  FETCH_ON_GET_NOTES_START,
  FETCH_ON_GET_NOTES_DATA_SUCCESS,
  FETCH_ON_GET_NOTES_DATA_START,
  FETCH_ON_GET_NOTES_DATA_STOP,
  FETCH_ON_GET_ARCHIVE_START,
  FETCH_ON_GET_ARCHIVE_SUCCESS,
  ON_CHANGE_FILTERS,
  FETCH_ON_GET_NOTES_STOP
} from "../constants/action-types";

const initialState = {
  notes: [],
  archive: [],
  tags: [],
  colors: [],
  colorsHash: {}, //Хэш цветов для быстрого доступа, не прибегая к постоянному перебору массива при выборе цвета по ID
  tagsHash: {}, //Хэш тэгов для быстрого доступа, не прибегая к постоянному перебору массива при выборе тэга по ID
  filters: [],
  isLoadingNotes: false,
  isLoadingMainData: false,
  isArchive: false
};
function rootReducer(state = initialState, action) {
  if (action.type === FETCH_ON_GET_NOTES_START) {
    return {
      ...state,
      isLoadingNotes: true,
      isArchive: false
    };
  } else if (action.type === FETCH_ON_GET_NOTES_SUCCESS) {
    return {
      ...state,
      notes: action.payload
    };
  } else if (action.type === FETCH_ON_GET_NOTES_STOP) {
    return {
      ...state,
      isLoadingNotes: false
    };
  } else if (action.type === FETCH_ON_GET_ARCHIVE_START) {
    return {
      ...state,
      isLoadingNotes: true,
      isArchive: true
    };
  } else if (action.type === FETCH_ON_GET_ARCHIVE_SUCCESS) {
    return {
      ...state,
      notes: action.payload
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_START) {
    return {
      ...state,
      isLoadingMainData: true
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_SUCCESS) {
    const { colors, tags } = action.payload;

    let colorsHash = {};
    if (colors) {
      colors.forEach(color => (colorsHash[color.id] = color));
    }

    let tagsHash = {};
    if (tags) {
      tags.forEach(tag => (tagsHash[tag.id] = tag));
    }

    const data = { ...action.payload, colorsHash, tagsHash };
    return {
      ...state,
      ...data
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_STOP) {
    return {
      ...state,
      isLoadingMainData: false
    };
  } else if (action.type === ON_CHANGE_FILTERS) {
    const { id } = action.payload;
    let filters = [...[], ...state.filters];
    if (!filters.includes(id)) {
      filters.push(id);
    } else {
      filters = filters.filter(item => item !== id);
    }
    return {
      ...state,
      filters
    };
  }
  return state;
}
export default rootReducer;
