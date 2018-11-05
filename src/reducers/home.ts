import {
  FETCHED_ARTICLE_HOME_PAGE, FETCHING_ARTICLE_HOME_PAGE,
  FETCHING_TAGS_LIST, FETCHED_TAGS_LIST, UPDATING_PAGINATION_ARTICLES_HOME_PAGE,
  UPDATED_PAGINATION_ARTICLES_HOME_PAGE,
  UPDATED_TAB_ARTICLES_HOME_PAGES
} from '../constants';
import { HomePageState } from '../interfaces/HomePageState';

const initHomePageState: HomePageState = {
  tags: [],
  articles: [],
  totalArticles: 0,
  isFetchingArticles: false,
  isUpdatingParamsArticles: false,
  isFetchingTags: false,
  currentTab: 'global',
  paramsArticles: { offset: 0, limit: 20, currentPage: 0 }
};

const HomeReducer = (state: HomePageState = initHomePageState, action: any) => {
  switch (action.type) {
    case FETCHING_ARTICLE_HOME_PAGE: {
      return { 
        ...state,
        isFetchingArticles: true,
      };
    }
    case FETCHED_ARTICLE_HOME_PAGE: {
      return { 
        ...state,
        isFetchingArticles: false,
        articles: action.data.articles || [],
        totalArticles: action.data.articlesCount ,
      };
    }
    case FETCHING_TAGS_LIST: {
      return { 
        ...state,
        isFetchingTags: true,
      };
    }
    case FETCHED_TAGS_LIST: {
      return { 
        ...state,
        isFetchingTags: false,
        tags: action.data || [],
      };
    }
    case UPDATED_TAB_ARTICLES_HOME_PAGES: {
      return { 
        ...state,
        currentTab: action.data || 'global',
        paramsArticles: { offset: 0, limit: 20, currentPage: 0 }
      };
    }
    case UPDATING_PAGINATION_ARTICLES_HOME_PAGE: {
      return { 
        ...state,
        isUpdatingParamsArticles: true,
      };
    }
    case UPDATED_PAGINATION_ARTICLES_HOME_PAGE: {
      return { 
        ...state,
        isUpdatingParamsArticles: false,
        paramsArticles: action.data || initHomePageState.paramsArticles
      };
    }
    default:
      return state;
  }
}

export default HomeReducer;