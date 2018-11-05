import { all } from 'redux-saga/effects';
import homeSaga from './homeSaga';
import globalSaga from './globalSaga';


function* appSaga() {
  yield all([
    homeSaga(),
    globalSaga(),
  ])
};

export default appSaga;