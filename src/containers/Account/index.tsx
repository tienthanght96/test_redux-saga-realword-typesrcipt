import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import UserInterface from "../../interfaces/UserInterface";
import AppState from '../../interfaces/AppState';
import { userSelector } from '../../selector/userSelector';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface Props {
  user: UserInterface;
}

class AccountContainer extends React.Component<Props & RouteComponentProps>{
  render(){
    // const { user } = this.props;
    const path = this.props.match.path;
    
    // if(!user || !user.token) {
    //   return <Redirect to={`${path}/signin`}/>;
    // }

    return (
      <React.Fragment>
        <Route component={SignIn} exact path={`${path}/signin`} />
        <Route component={SignUp} exact path={`${path}/signup`} />
        <Route component={() => <div>Profile</div>} path={`${path}/profile`}  />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state)
})
export default connect(mapStateToProps)(AccountContainer);