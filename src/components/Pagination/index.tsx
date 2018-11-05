import * as React from 'react';

interface Props{
  onClickPage(page: number): void,
  totalArticles: number,
  currentPage: number,
}

const Pagination: React.SFC<Props> = props => {
  const { totalArticles, currentPage, onClickPage } = props;
  if(!totalArticles) return null;
  
  return (
    <nav>
      <ul className="pagination">
        {Array.from(Array(Math.round(totalArticles /20)).keys()).map(i => (
          <li
            className={`page-item ${i == currentPage ? "active" : ""}`}
            key={i}
          >
            <a
              className="page-link"
              href=""
              onClick={e => {
                e.preventDefault();
                onClickPage(i);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}  
export default Pagination;