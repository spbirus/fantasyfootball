import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import RootReducer from "./reducers";
import errorMiddleware from "./utils/actionsErrorMiddleware";

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
}

const devMiddleware = [logger];

let middlewares = [thunk, errorMiddleware, promise];

if (process.env.REACT_APP_ENABLE_DEV_MIDDLEWARE === "true") {
  middlewares = middlewares.concat(devMiddleware);
}

const composeEnhancers = window._REACT_APP_ENABLE_DEV_MIDDLEWARE_ || compose

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;