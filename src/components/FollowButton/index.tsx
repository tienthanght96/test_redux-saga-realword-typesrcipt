import * as React from "react";
import AuthorArticleInterface from '../../interfaces/AuthorArticleInterface';

interface Props {
  profile?: AuthorArticleInterface;
}

interface State{
  isFollowed: boolean,
}

export default class FollowButton extends React.PureComponent<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      isFollowed: false
    }
  }

  componentDidMount() {
    this.initFollowArticle();
  }

  initFollowArticle = () => {
    const { profile } = this.props;
    if(profile && typeof profile.following === 'boolean'){
      this.setState({ isFollowed: profile.following });
    }
  }

  render(){
    const { isFollowed } = this.state;
    const { profile } = this.props;
    
    if(!profile) return null;

    return (
      <button
        className={"btn btn-sm btn-outline-secondary action-btn"}
        // onClick={this.onHandleChangeFollowUser}
        // disabled={isLoading}
      >
        <i className="ion-plus-round" />
        &nbsp;
        {isFollowed ? "Unfollow" : "Follow"} {profile.username}
      </button>
    );
  }
}