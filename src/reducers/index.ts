import { combineReducers } from "redux";
import HomeReducer from "./home";
import GlobalReducer from './global';

const appReducer = combineReducers({
  home: HomeReducer,
  global: GlobalReducer
});

export default appReducer;
