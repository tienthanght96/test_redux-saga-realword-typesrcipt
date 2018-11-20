import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserInterface from '../../interfaces/UserInterface';
import AppState from '../../interfaces/AppState';
import { userSelector } from '../../selector/userSelector';

interface PropsHeader {
  user: UserInterface
}

const RouteGuest = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/account/signin" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/account/signup" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

const RouteLogged: React.SFC<PropsHeader> = ({ user }: PropsHeader) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
              </Link>
          </li>

          <li className="nav-item">
            <Link to="/account/editor" className="nav-link">
              <i className="ion-compose"></i>&nbsp;New Post
              </Link>
          </li>

          <li className="nav-item">
            <Link to="/account/settings" className="nav-link">
              <i className="ion-gear-a"></i>&nbsp;Settings
              </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/account/profile/${user.username}`}
              className="nav-link">
              {user.username}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

class HeaderContainer extends React.PureComponent<PropsHeader> {
  render() {
    const { user } = this.props;
    if(user && user.username) return <RouteLogged user={user}/>;
    return <RouteGuest />
  }
}

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state)
});

export default connect(mapStateToProps)(HeaderContainer);