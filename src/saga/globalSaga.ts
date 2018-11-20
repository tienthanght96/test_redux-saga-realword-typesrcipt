import { all, put, call, takeLatest } from "redux-saga/effects";
import { APP_LOADED, APP_LOADING } from "../constants";
import axios, { AxiosRequestConfig } from "axios";
import { getAuthHeader } from '../utils';

function* loadApp() {
  const response= yield axios.get('http://mysafeinfo.com/api/data?list=englishmonarchs.json');
  const data = yield response.data;
  console.log('response', data)
  // const json = yield response.json();


  const token = localStorage.getItem("token");
  if (!token) {
    yield put({ type: APP_LOADED });
    return;
  }
  try {
    const options: AxiosRequestConfig = {
      headers: getAuthHeader(),
    }
    const url = `${process.env.REACT_APP_API_URL}user`;
    const { data } = yield yield call(axios.get, url, options);
    const { user } = data;
    yield put({ type: APP_LOADED, data: user });
    
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
