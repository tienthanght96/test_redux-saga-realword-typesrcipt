import * as React from 'react';

interface Props {
  favorited: boolean;
  favoritesCount?: number,
}

interface State{
  isFavorited: boolean; 
}

export default class FavoriteButton extends React.PureComponent<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      isFavorited: false,
    }
  }

  componentDidMount() {
    this.initValueFavorited();
  }

  componentDidUpdate(prevProps: Props) {
    if(this.props.favorited !== prevProps.favorited){
      this.initValueFavorited();
    }
  }
  
  initValueFavorited = () => {
    const { favorited } = this.props;
    if(typeof favorited === 'boolean') this.setState({ isFavorited: favorited });
  }

  render(){
    const { isFavorited } = this.state;
    const { favoritesCount } = this.props;
    
    return (
      <button
        className={`btn btn-sm pull-xs-right ${
          isFavorited ? "btn-primary" : "btn-outline-primary"
        }`}
        // disabled={isLoading}
        // onClick={() => this.onHandleChangeFavorite(isFavorited)}
      >
        {(favoritesCount && favoritesCount > 0) 
          ? (
              <span>
                <i className="ion-heart" /> {favoritesCount}
              </span>
            ) 
          : (
            <span>
              <i className="ion-heart" />
              &nbsp; Favorite Article
              <span className="counter">({favoritesCount})</span>
            </span>
            )
          }
      </button>
    )
  }
}
