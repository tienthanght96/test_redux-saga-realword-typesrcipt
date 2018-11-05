import * as React from "react";
import ArticleInterface from "../../interfaces/ArticleInterface";
import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";

interface Props {
  article: ArticleInterface;
}

const ArticleCard: React.SFC<Props> = ({ article }: Props) => {
  const { author } = article;
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${author.username}`}>
          <img src={author.image ? author.image : ""} />
        </Link>
        <div className="info">
          <Link to={`/@${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toLocaleString()}
          </span>
        </div>
        <FavoriteButton
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>

        <ul className="tag-list">
          {article.tagList &&
            article.tagList.map((tag, i) => (
              <li className="tag-default tag-pill tag-outline" key={i}>
                {tag}
              </li>
            ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticleCard;
