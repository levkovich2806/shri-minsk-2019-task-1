import {
  FETCH_ON_GET_NOTES_SUCCESS,
  FETCH_ON_GET_NOTES_START,
  FETCH_ON_GET_NOTES_DATA_SUCCESS,
  FETCH_ON_GET_NOTES_DATA_START,
  FETCH_ON_GET_NOTES_DATA_STOP,
  FETCH_ON_GET_ARCHIVE_START,
  FETCH_ON_GET_ARCHIVE_SUCCESS,
  ON_CHANGE_FILTERS,
  FETCH_ON_GET_NOTES_STOP,
  SET_EDIT_NOTE_STATE,
  SET_ADD_NOTE_STATE,
  ON_HIDE_MODAL,
  ON_SHOW_MODAL
} from "../constants/action-types";

const sessionFilters = localStorage.getItem("filters");

const initialState = {
  notes: [],
  notesHash: {},
  archive: [],
  tags: [],
  colors: [],
  colorsHash: {}, //Хэш цветов для быстрого доступа, не прибегая к постоянному перебору массива при выборе цвета по ID
  tagsHash: {}, //Хэш тэгов для быстрого доступа, не прибегая к постоянному перебору массива при выборе тэга по ID
  filters: sessionFilters ? JSON.parse(sessionFilters) : [],
  isLoadingNotes: false,
  isLoadingMainData: false,
  isArchive: false,
  modalVisible: false,
  editableNoteId: -1
};
function rootReducer(state = initialState, action) {
  if (action.type === FETCH_ON_GET_NOTES_START) {
    return {
      ...state,
      isLoadingNotes: true,
      isArchive: false
    };
  } else if (action.type === FETCH_ON_GET_NOTES_SUCCESS) {
    const notes = action.payload;
    let notesHash = {};
    if (notes) {
      notes.forEach(note => (notesHash[note.id] = note));
    }

    return {
      ...state,
      notes,
      notesHash
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
    const notes = action.payload;
    let notesHash = {};
    if (notes) {
      notes.forEach(note => (notesHash[note.id] = note));
    }

    return {
      ...state,
      notes,
      notesHash
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_START) {
    return {
      ...state,
      isLoadingMainData: true
    };
  } else if (action.type === FETCH_ON_GET_NOTES_DATA_SUCCESS) {
    const { colors, tags, notes } = action.payload;

    let colorsHash = {};
    if (colors) {
      colors.forEach(color => (colorsHash[color.id] = color));
    }

    let tagsHash = {};
    if (tags) {
      tags.forEach(tag => (tagsHash[tag.id] = tag));
    }

    let notesHash = {};
    if (notes) {
      notes.forEach(note => (notesHash[note.id] = note));
    }

    const data = { ...action.payload, colorsHash, tagsHash, notesHash };
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

    localStorage.setItem("filters", JSON.stringify(filters));

    return {
      ...state,
      filters
    };
  } else if (action.type === SET_EDIT_NOTE_STATE) {
    const { id } = action.payload;

    return {
      ...state,
      editableNoteId: id
    };
  } else if (action.type === SET_ADD_NOTE_STATE) {
    return {
      ...state,
      editableNoteId: -1
    };
  } else if (action.type === ON_SHOW_MODAL) {
    return {
      ...state,
      modalVisible: true
    };
  } else if (action.type === ON_HIDE_MODAL) {
    return {
      ...state,
      modalVisible: false
    };
  }
  return state;
}
export default rootReducer;
