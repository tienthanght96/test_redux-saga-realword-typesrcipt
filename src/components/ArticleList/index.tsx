import * as React from 'react';
import ArticleInterface from '../../interfaces/ArticleInterface';
import ArticleCard from '../ArticleCard';

interface Props{
  articles: Array<ArticleInterface>
}

class ArticleList extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { articles } = this.props;
    
    if(articles.length < 1) return <div className="article-preview">No articles are here... yet.</div>;

    return articles.map(article => <ArticleCard key={article.slug} article={article} />) ;
  }
}

export default ArticleList;