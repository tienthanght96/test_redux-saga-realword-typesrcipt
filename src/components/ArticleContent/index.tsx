import * as React from "react";
import { Link } from 'react-router-dom';
import ArticleInterface from "../../interfaces/ArticleInterface";
import UserInterface from '../../interfaces/UserInterface';
import FollowButton from '../FollowButton';
import FavoriteButton from '../FavoriteButton';

interface PropsArticle {
  article: ArticleInterface;
  user: UserInterface,
  onDeleteArticle?(article_id: string): void
}

const AricleCardContainer : React.SFC<PropsArticle> = ({ article, user, onDeleteArticle }:PropsArticle) => {
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image ? article.author.image : ''} />
      </Link>
      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.updatedAt).toLocaleString()}
        </span>
      </div>
      {user == null || user.username != article.author.username ? (
        <React.Fragment>
          <FollowButton
            profile={article.author || null}
          />
          <FavoriteButton
            // favorited={article.favorited}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            
            // favorite={{
            //   favorited: article.favorited,
            //   favoritesCount: article.favoritesCount,
            //   articleSlug: article.slug
            // }}
          />
          <div>Follow and Favorite</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link
            className="btn btn-outline-secondary btn-sm"
            to={`/editor/${article.slug}`}
          >
            <i className="ion-edit" /> Edit Article
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => typeof onDeleteArticle === 'function' && onDeleteArticle(article.slug)}
          >
            <i className="ion-trash-a" /> Delete Article
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default AricleCardContainer;