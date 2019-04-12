import { ADD_NOTE } from "../constants/action-types";
const initialState = {
  notes: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_NOTE) {
    return Object.assign({}, state, {
      notes: state.notes.concat(action.payload)
    });
  }
  return state;
}
export default rootReducer;
