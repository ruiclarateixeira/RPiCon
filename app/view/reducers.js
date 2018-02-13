import { combineReducers } from "redux";

const reducer = function(state, action) {
  switch (action.type) {
    case "OPEN_FILE":
      return { ...state, openFiles: [action.fileName] };
    default:
      return { ...state };
  }
};

export default reducer;
