import { combineReducers } from "redux";

const reducer = function(state, { type, fileName }) {
  switch (type) {
    case "OPEN_FILE":
      if (state.openFiles.includes(fileName)) return { ...state };
      var openFiles = state.openFiles.concat([fileName]);
      return { ...state, openFiles };
    case "CLOSE_FILE":
      var openFiles = state.openFiles.filter(file => file !== fileName);
      return { ...state, openFiles };
    default:
      return { ...state };
  }
};

export default reducer;
