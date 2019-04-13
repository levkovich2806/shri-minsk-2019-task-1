import { combineReducers } from 'redux';
import notes from './notes';
import filterNotes from './filterNotes';

export default combineReducers({
  notes,
  filterNotes
});
