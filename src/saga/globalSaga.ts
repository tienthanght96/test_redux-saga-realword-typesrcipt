import { all, put, call, takeLatest } from "redux-saga/effects";
import { APP_LOADED, APP_LOADING } from "../constants";
import axios from "axios";

function* loadApp() {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put({ type: APP_LOADED, user: null, token });
    return;
  }
  try {
    const { data } = yield call(axios.get, "user");
    console.log(data);
    yield put({ type: APP_LOADED, data });
    
  } catch (error) {
    yield put({ type: APP_LOADED, data: null });
  }
}

function* watchLoadApp(){
  yield takeLatest(APP_LOADING,loadApp);
}

export default function* global() {
  yield all([watchLoadApp()]);
}
