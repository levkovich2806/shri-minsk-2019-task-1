import { combineReducers } from 'redux';
import notes from './notes';
import search from './search';

export default combineReducers({
  notes,
  search,
});
