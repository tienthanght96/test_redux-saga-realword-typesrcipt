import { all } from 'redux-saga/effects';
import homeSaga from './homeSaga';
import globalSaga from './globalSaga';
import accountSaga from './accountSaga';


function* appSaga() {
  yield all([
    homeSaga(),
    globalSaga(),
    accountSaga()
  ])
};

export default appSaga;