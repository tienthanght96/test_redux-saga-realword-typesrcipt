import { all, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { USER_LOGIN_REGISTER, USER_LOGINED_REGISTER_ERROR, USER_LOGINED_REGISTERED, USER_LOGINING_REGISTERING } from '../constants';
import { formatErrorMessages } from '../utils';

function userLoginRegister(url: string, params: any){
  return axios.post(process.env.REACT_APP_API_URL + url, params);
};

function* login(action : any){
  try {
    yield put({ type: USER_LOGINING_REGISTERING });
    const response = yield call(userLoginRegister, 'users/login', { user: action.data });
    const { data } = response;
    const { user } = data;
    // console.log('data login', user);
    localStorage.setItem('token', user.token);
    yield put({ type: USER_LOGINED_REGISTERED, data: user  });
    if(typeof action.callback === 'function'){
      yield action.callback();
    }
  } catch (error) {
    // console.log('error', error.response.data);
    const errors = formatErrorMessages(error.response.data.errors);
    yield put({ type: USER_LOGINED_REGISTER_ERROR, data: errors });
  }
}

function* watchUserLogin(){
  yield takeLatest(USER_LOGIN_REGISTER, login);
}

export default function* accountSaga(){
  yield all([
    watchUserLogin()
  ])
}
