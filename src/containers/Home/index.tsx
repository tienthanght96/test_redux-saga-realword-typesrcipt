import * as React from 'react';
import { connect } from 'react-redux';
import ArticleInterface from '../../interfaces/ArticleInterface';
import TagItem from '../../interfaces/TagItem';
import { FETCH_ARTICLE_HOME_PAGE, FETCH_TAGS_HOME_PAGE, UPDATE_TAB_ARTICLES_HOME_PAGE, UPDATING_PAGINATION_ARTICLES_HOME_PAGE } from '../../constants';
import AppState from '../../interfaces/AppState';
import {
  articlesSelector, tagsSelector, fetchArticlesStatusSelector,
  fetchTagsStatusSelector, articlesTabSelector, totalArticlesSelector,
  articlesParamsSelector, isUpdatingParamsArticlesSelector
} from '../../selector/homeSelector';
import ArticleList from '../../components/ArticleList';
import TagList from '../../components/TagList';
import Banner from '../../components/BannerHome';
import UserInterface from '../../interfaces/UserInterface';
import { userSelector } from '../../selector/userSelector';
import TabsHomePage from '../../components/TabsHomePage';
import Pagination from '../../components/Pagination';

interface Props {
  articles: Array<ArticleInterface>,
  tags: Array<TagItem>,
  isFetchingTags: boolean,
  isFetchingArticles: boolean,
  fetchArticlesHomePage(): void
  fetchTagsHomePage(): void,
  user: UserInterface,
  currentTab: string,
  totalArticles: number,
  paramsArticles: any,
  isUpdatingParamsArticles: boolean,
  updateParamsArticles(params: any): void
  updateTabArticles(tab: string | TagItem): void
};

class HomeContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {  };
  }

  componentDidMount() {
    this.props.fetchArticlesHomePage();
    this.props.fetchTagsHomePage();
  }
  
  tabClickHandler = (tab: string | TagItem) => {
    this.props.updateTabArticles(tab);
  }

  pageClickHandler = (page: number) => {
    const { currentPage } = this.props.paramsArticles;
    if(page !== currentPage){
      const paramsArticles = { offset: page  * 20, limit: 20, currentPage: page }
      this.props.updateParamsArticles(paramsArticles);
    }
  }
  
  render() {
    const {
      isFetchingArticles, isFetchingTags, tags,
      articles, user, currentTab ,
      totalArticles, paramsArticles
    } = this.props;
    return (
      <div className="home-page">
        <Banner token={user.token} />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
            <TabsHomePage
              currentTab={currentTab}
              user={user}
              onClickTab={this.tabClickHandler}
            />
            { isFetchingArticles
              ? <div><br />Loading articles....</div>
              : <div>
                  <ArticleList articles={articles} />
                  { currentTab !== 'feed' &&
                      <Pagination
                        totalArticles={totalArticles}
                        currentPage={paramsArticles.currentPage}
                        onClickPage={this.pageClickHandler}
                      />
                  }
                </div>
            }
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                { isFetchingTags
                  ? <div>Loading tags....</div>
                  : <TagList tags={tags} onClickTag={this.tabClickHandler} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({

  articles: articlesSelector(state),
  tags: tagsSelector(state),
  isFetchingArticles: fetchArticlesStatusSelector(state),
  isFetchingTags: fetchTagsStatusSelector(state),
  user: userSelector(state),
  currentTab: articlesTabSelector(state),
  totalArticles: totalArticlesSelector(state),
  paramsArticles: articlesParamsSelector(state),
  isUpdatingParamsArticles: isUpdatingParamsArticlesSelector(state),

});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchArticlesHomePage: () => dispatch({type : FETCH_ARTICLE_HOME_PAGE}),
    fetchTagsHomePage: () => dispatch({type : FETCH_TAGS_HOME_PAGE}),
    updateTabArticles: (params: any) => dispatch({type : UPDATE_TAB_ARTICLES_HOME_PAGE, data: params}),
    updateParamsArticles: (params: any) => dispatch({type : UPDATING_PAGINATION_ARTICLES_HOME_PAGE, data: params}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);