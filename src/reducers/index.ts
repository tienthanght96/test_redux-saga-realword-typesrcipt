import { combineReducers } from "redux";
import HomeReducer from "./home";
import GlobalReducer from './global';
import AccountReducer from './account';

const appReducer = combineReducers({
  home: HomeReducer,
  global: GlobalReducer,
  account: AccountReducer,
});

export default appReducer;
