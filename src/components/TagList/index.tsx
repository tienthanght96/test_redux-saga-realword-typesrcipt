import * as React from 'react';
import TagItem from '../../interfaces/TagItem';

interface Props {
  tags: Array<TagItem>,
  onClickTag(tag: TagItem): void, 
}

const TagList: React.SFC<Props> = ({ tags, onClickTag } : Props) => {
  if(tags.length <=1) return null;
  return (
    <div className="tag-list">
      {tags.map((tag, index) => {
        return (
          <a
            href=""
            className="tag-default tag-pill"
            key={index}
            onClick={(e) => {
              e.preventDefault();
              typeof onClickTag === 'function' && onClickTag(tag)
            }}
          >
            {tag}
          </a>
        );
      })}
    </div>
  )
}

export default TagList;