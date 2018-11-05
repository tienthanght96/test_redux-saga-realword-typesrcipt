import ArticleInterface from './ArticleInterface';
import TagItem from './TagItem';

export interface HomePageState {
  articles: Array<ArticleInterface>,
  tags: Array<TagItem>,
  isFetchingArticles: boolean,
  isFetchingTags: boolean,
  totalArticles: number,
  currentTab?: string | null,
  paramsArticles?: any,
  isUpdatingParamsArticles?: boolean,
}