import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import appReducer from "../reducers";
import appSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();
const appMiddleware = applyMiddleware(sagaMiddleware);

const appStore = createStore(appReducer, appMiddleware);

// Run saga middleware
const rootTask = sagaMiddleware.run(appSaga);
rootTask.done.catch(error => {
  console.log("error saga run", error);
});

export default appStore;
