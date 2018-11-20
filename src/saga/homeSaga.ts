import { all, call, take, takeLatest, put, select } from 'redux-saga/effects';
import { APP_LOADED, FETCHING_ARTICLE_HOME_PAGE, FETCH_ARTICLE_HOME_PAGE, FETCHED_ARTICLE_HOME_PAGE, FETCH_TAGS_HOME_PAGE, FETCHING_TAGS_LIST, FETCHED_TAGS_LIST, UPDATED_TAB_ARTICLES_HOME_PAGES, UPDATE_TAB_ARTICLES_HOME_PAGE, UPDATED_PAGINATION_ARTICLES_HOME_PAGE, UPDATING_PAGINATION_ARTICLES_HOME_PAGE } from '../constants';
import axios from 'axios';
import { setStatusFetch } from '../actions/homeActions';
import { articlesTabSelector, articlesParamsSelector } from '../selector/homeSelector';
import { appSelector } from '../selector/globalSelector';
import { getAuthHeader } from '../utils';


// fetch articles
function fetchArticles(url: string, params: any, isHaveToken?: boolean) {
  return axios({
    headers: isHaveToken ? getAuthHeader() : { Accept: 'application/json' },
    method: "get",
    url,
    params,
  });
}

function* fetchListArticlesHomePage(){
  
  const isLoadingApp = yield select(appSelector);
  if(isLoadingApp){
    yield take(APP_LOADED);
  }
  const currentTab = yield select(articlesTabSelector);
  const params = yield select(articlesParamsSelector);
  let url = `${process.env.REACT_APP_API_URL}articles`;
  let isHaveToken = false;
  yield put(setStatusFetch(FETCHING_ARTICLE_HOME_PAGE));
  
  if(currentTab === 'feed'){
    // https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
    url = `${process.env.REACT_APP_API_URL}articles/feed`;
    isHaveToken = true;
  }

  if(currentTab !== 'feed' && currentTab !== 'global'){
    params.tag = currentTab;
  }

  const queryParams = {...params};
  delete queryParams.currentPage;
  console.log(queryParams, url);
  try {
    const { data } = yield call(fetchArticles, url, queryParams, isHaveToken);
    console.log('data',data)
    yield put(setStatusFetch(FETCHED_ARTICLE_HOME_PAGE, data ));
  } catch (error) {
    console.log('error', error)
    yield put(setStatusFetch(FETCHED_ARTICLE_HOME_PAGE ));
  }
}


// watch articles
function* watchFetchListArticles(){
  yield takeLatest(FETCH_ARTICLE_HOME_PAGE,fetchListArticlesHomePage);
}

// fetch tags
function* fetchTagsHomePage(){
  const isLoadingApp = yield select(appSelector);
  if(isLoadingApp){
    yield take(APP_LOADED);
  }
  yield put(setStatusFetch(FETCHING_TAGS_LIST));
  const url = `${process.env.REACT_APP_API_URL}/tags`;
  try {
    const { data } = yield call(axios.get, url);
    const { tags } = data;
    yield put(setStatusFetch(FETCHED_TAGS_LIST, tags ));
  } catch (error) {
    yield put(setStatusFetch(FETCHED_TAGS_LIST ));
  }
}

function* watchFetchListTags(){
  yield takeLatest(FETCH_TAGS_HOME_PAGE,fetchTagsHomePage);
}

// update tab
function* updateCurrentTabHomePage(action: any){
  yield put(setStatusFetch(UPDATED_TAB_ARTICLES_HOME_PAGES, action.data ));
  yield put(setStatusFetch(FETCH_ARTICLE_HOME_PAGE ));
}

function* watchUpdateCurrentTab(){
  yield takeLatest(UPDATE_TAB_ARTICLES_HOME_PAGE,updateCurrentTabHomePage);
}

// update pagination


function* updatePaginationHomePage(action: any){
  // yield console.log(action.data, UPDATED_PAGINATION_ARTICLES_HOME_PAGE)
  yield put(setStatusFetch(UPDATED_PAGINATION_ARTICLES_HOME_PAGE, action.data ));
  yield put(setStatusFetch(FETCH_ARTICLE_HOME_PAGE ));
}

function* watchUpdatePagination(){
  yield takeLatest(UPDATING_PAGINATION_ARTICLES_HOME_PAGE,updatePaginationHomePage);
}

export default function* homeSaga() {
  yield all([
    watchFetchListArticles(),
    watchFetchListTags(),
    watchUpdateCurrentTab(),
    watchUpdatePagination()
  ])
}