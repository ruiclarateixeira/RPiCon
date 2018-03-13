import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";

const logger = store => next => action => {
  console.log("Action fired!\n" + JSON.stringify(action));
  next(action);
};

const defaultState = {
  openFiles: []
};

const middleware = applyMiddleware(logger);
const store = createStore(reducers, defaultState, middleware);

export default store;
