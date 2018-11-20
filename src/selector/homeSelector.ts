import AppState from '../interfaces/AppState';

export const articlesSelector = (state: AppState) => state.home.articles;
export const articlesTabSelector = (state: AppState) => state.home.currentTab;
export const articlesParamsSelector = (state: AppState) => state.home.paramsArticles;
export const isUpdatingParamsArticlesSelector = (state: AppState) => state.home.isUpdatingParamsArticles;
export const totalArticlesSelector = (state: AppState) => state.home.totalArticles;
export const fetchArticlesStatusSelector = (state: AppState) => state.home.isFetchingArticles;
export const tagsSelector = (state: AppState) => state.home.tags;
export const fetchTagsStatusSelector = (state: AppState) => state.home.isFetchingTags;